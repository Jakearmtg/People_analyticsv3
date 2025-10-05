import { MonthlyData } from '../types';

const parseBrazilianNumber = (str: string): number => {
    if (!str) return 0;
    const cleanedStr = str.replace(/[R$."]/g, '').replace(/,/g, '.').trim();
    return parseFloat(cleanedStr) || 0;
};

export const parseHRDataFromCSV = (csvText: string): MonthlyData => {
    const lines = csvText.split('\n').map(l => l.trim().replace(/"/g, ''));
    
    const data: any = {
        turnover: {},
        averageTenure: {},
        absenteeism: { byDepartment: {} },
        overtime: {},
        payroll: { byCostCenter: {} },
        vacations: {},
        leaves: {},
        hiring: {},
        ageDemographics: { ageRanges: {} },
        timeBank: {},
    };

    let section = '';

    for (const line of lines) {
        if (!line || line === ',') continue;

        // Section detection logic
        if (line.startsWith('1. TURNOVER')) section = 'TURNOVER';
        else if (line.startsWith('2. TEMPO MÉDIO DE CASA')) section = 'TENURE';
        else if (line.startsWith('3. ABSENTEÍSMO,')) section = 'ABSENTEEISM';
        else if (line.startsWith('ABSENTEÍSMO POR SETOR')) section = 'ABSENTEEISM_DEPT';
        else if (line.startsWith('4. HORAS EXTRAS')) section = 'OVERTIME';
        else if (line.startsWith('5. FOLHA POR CENTRO DE CUSTO')) section = 'PAYROLL';
        else if (line.startsWith('6. FÉRIAS')) section = 'VACATIONS';
        else if (line.startsWith('7. LICENÇAS')) section = 'LEAVES';
        else if (line.startsWith('8. ADMISSÕES X DEMISSÕES')) section = 'HIRING';
        else if (line.startsWith('9. IDADE MÉDIA E FAIXA ETÁRIA')) section = 'AGE';
        else if (line.startsWith('10. BANCO DE HORAS')) section = 'TIMEBANK';
        
        // Handle MÊS/ANO separately as it's a unique line
        if (line.startsWith('MÊS/ANO:')) {
            data.monthYear = (line.split(',')[1] || '').trim();
            continue;
        }
        
        const colonIndex = line.indexOf(':');
        // If a line has no colon, it's likely a section header, which we've already processed.
        if (colonIndex === -1) {
            continue;
        }

        const key = line.substring(0, colonIndex).trim();
        let value = line.substring(colonIndex + 1).trim();

        // The CSV sometimes uses ':,value', so we strip the leading comma if it exists.
        if (value.startsWith(',')) {
            value = value.substring(1);
        }

        switch (section) {
            case 'TURNOVER':
                if (key.includes('Número de desligamentos no período')) data.turnover.resignations = parseInt(value, 10);
                if (key.includes('Número médio de colaboradores ativos')) data.turnover.activeEmployees = parseInt(value, 10);
                if (key.includes('Turnover')) data.turnover.rate = parseBrazilianNumber(value);
                break;
            case 'TENURE':
                if (key.includes('Tempo médio em dias')) data.averageTenure.averageDays = parseInt(value, 10);
                if (key.includes('Observação')) data.averageTenure.observation = value;
                break;
            case 'ABSENTEEISM':
                if (key.includes('Total de faltas injustificadas')) data.absenteeism.unjustifiedAbsences = parseInt(value, 10);
                if (key.includes('Total de atestados')) data.absenteeism.medicalAbsences = parseInt(value, 10);
                if (key.includes('Total de dias possíveis')) data.absenteeism.possibleDays = parseInt(value, 10);
                if (key.includes('Índice de absenteísmo')) data.absenteeism.rate = parseBrazilianNumber(value);
                break;
            case 'ABSENTEEISM_DEPT':
                if (key) data.absenteeism.byDepartment[key] = parseInt(value, 10);
                break;
            case 'OVERTIME':
                if (key.includes('Total de horas extras (HH:MM)')) data.overtime.totalHours = value;
                if (key.includes('Valor total (R$)')) data.overtime.totalCost = parseBrazilianNumber(value);
                break;
            case 'PAYROLL':
                if (key) {
                    const centerKey = key.replace('(R$)', '').trim();
                    data.payroll.byCostCenter[centerKey] = parseBrazilianNumber(value);
                }
                break;
            case 'VACATIONS':
                if (key.includes('Férias vencidas')) data.vacations.due = parseInt(value, 10);
                if (key.includes('Férias programadas')) data.vacations.scheduled = parseInt(value, 10);
                break;
            case 'LEAVES':
                if (key.includes('Maternidade')) data.leaves.maternity = parseInt(value, 10);
                if (key.includes('Doença')) data.leaves.sickness = parseInt(value, 10);
                if (key.includes('Acidente')) data.leaves.accident = parseInt(value, 10);
                break;
            case 'HIRING':
                if (key.includes('Admissões')) data.hiring.admissions = parseInt(value, 10);
                if (key.includes('Desligamentos')) data.hiring.resignations = parseInt(value, 10);
                break;
            case 'AGE':
                if (key.includes('Idade média')) data.ageDemographics.average = parseBrazilianNumber(value);
                if (key.includes('Idade mínima')) data.ageDemographics.min = parseInt(value, 10);
                if (key.includes('Idade máxima')) data.ageDemographics.max = parseInt(value, 10);
                if (key.includes('Até 25 anos')) data.ageDemographics.ageRanges['Até 25'] = parseInt(value, 10);
                if (key.includes('26 a 35 anos')) data.ageDemographics.ageRanges['26-35'] = parseInt(value, 10);
                if (key.includes('36 a 45 anos')) data.ageDemographics.ageRanges['36-45'] = parseInt(value, 10);
                if (key.includes('46 a 55 anos')) data.ageDemographics.ageRanges['46-55'] = parseInt(value, 10);
                if (key.includes('56 anos ou mais')) data.ageDemographics.ageRanges['56+'] = parseInt(value, 10);
                break;
            case 'TIMEBANK':
                if (key.includes('Saldo médio (horas)')) data.timeBank.averageBalance = parseInt(value, 10);
                break;
        }
    }
    if(!data.monthYear) {
      throw new Error("Could not find 'MÊS/ANO' in the CSV file.");
    }
    return data as MonthlyData;
};