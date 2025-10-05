
import React from 'react';
import { MonthlyData, ViewMode } from '../types';
import MetricCard from './MetricCard';
import BarChartComponent from './BarChartComponent';
import PieChartComponent from './PieChartComponent';
import LineChartComponent from './LineChartComponent';
import { UsersIcon, UserMinusIcon, CurrencyDollarIcon, ClockIcon, CakeIcon, CalendarIcon, BriefcaseIcon, PlusIcon, MinusIcon } from './icons';

interface DashboardProps {
  data: MonthlyData | Record<string, MonthlyData>;
  viewMode: ViewMode;
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

const MonthlyView: React.FC<{ monthData: MonthlyData }> = ({ monthData }) => {
  const { turnover, averageTenure, absenteeism, overtime, payroll, vacations, leaves, hiring, ageDemographics } = monthData;
  
  const absenteeismData = Object.entries(absenteeism.byDepartment).map(([name, value]) => ({ name, value }));
  const payrollData = Object.entries(payroll.byCostCenter).map(([name, value]) => ({ name, value }));
  const ageData = Object.entries(ageDemographics.ageRanges).map(([name, value]) => ({ name, value }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {/* KPIs */}
      <MetricCard title="Turnover" value={`${(turnover.rate * 100).toFixed(2)}%`} icon={<UserMinusIcon />} />
      <MetricCard title="Absenteísmo" value={`${absenteeism.rate.toFixed(2)}%`} icon={<CalendarIcon />} />
      <MetricCard title="Tempo Médio de Casa" value={`${averageTenure.observation}`} icon={<ClockIcon />} />
      {/* Fix: Add explicit types for reduce callback parameters. */}
      <MetricCard title="Total Folha de Pag." value={formatCurrency(Object.values(payroll.byCostCenter).reduce((a: number, b: number) => a + b, 0))} icon={<CurrencyDollarIcon />} />
      
      <div className="col-span-1 md:col-span-2 lg:col-span-2">
        <BarChartComponent data={payrollData} title="Folha por Centro de Custo" dataKey="value" nameKey="name" formatAsCurrency={true} />
      </div>

      <div className="col-span-1 md:col-span-2 lg:col-span-2 grid grid-cols-2 gap-6">
        <MetricCard title="Colaboradores Ativos" value={turnover.activeEmployees.toString()} icon={<UsersIcon />} />
        <MetricCard title="Custo Horas Extras" value={formatCurrency(overtime.totalCost)} icon={<CurrencyDollarIcon />} />
        <MetricCard title="Admissões" value={hiring.admissions.toString()} icon={<PlusIcon />} />
        <MetricCard title="Desligamentos" value={hiring.resignations.toString()} icon={<MinusIcon />} />
      </div>

      <div className="col-span-1 md:col-span-2">
         <BarChartComponent data={absenteeismData} title="Absenteísmo por Setor (dias)" dataKey="value" nameKey="name" />
      </div>
      
      <div className="col-span-1 md:col-span-2">
        <PieChartComponent data={ageData} title="Faixa Etária" />
      </div>
      
       <div className="col-span-1 grid grid-rows-3 gap-6">
        <MetricCard title="Férias Vencidas" value={vacations.due.toString()} icon={<CalendarIcon />} />
        <MetricCard title="Licenças (Doença)" value={leaves.sickness.toString()} icon={<BriefcaseIcon />} />
        <MetricCard title="Idade Média" value={`${ageDemographics.average.toFixed(1)} anos`} icon={<CakeIcon />} />
       </div>
    </div>
  );
};

const GeneralView: React.FC<{ allData: Record<string, MonthlyData> }> = ({ allData }) => {
    // Fix: Add explicit types for sort callback parameters to resolve 'unknown' type errors.
    const sortedData = Object.values(allData).sort((a: MonthlyData, b: MonthlyData) => {
        const [aMonth, aYear] = a.monthYear.split('/');
        const [bMonth, bYear] = b.monthYear.split('/');
        return new Date(`${aYear}-${aMonth}-01`).getTime() - new Date(`${bYear}-${bMonth}-01`).getTime();
    });

    // Fix: Add explicit types for map callback parameters.
    const turnoverTrend = sortedData.map((d: MonthlyData) => ({ name: d.monthYear, Turnover: d.turnover.rate * 100 }));
    const hiringTrend = sortedData.map((d: MonthlyData) => ({ name: d.monthYear, Admissões: d.hiring.admissions, Desligamentos: d.hiring.resignations }));
    // Fix: Add explicit types for map and reduce callback parameters.
    const payrollTrend = sortedData.map((d: MonthlyData) => ({ name: d.monthYear, Custo: Object.values(d.payroll.byCostCenter).reduce((a: number, b: number) => a + b, 0) }));

    const latestMonth = sortedData[sortedData.length - 1];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            <div className="col-span-1 lg:col-span-2 xl:col-span-3">
                <h2 className="text-2xl font-bold mb-4 text-white">Tendências ao Longo do Tempo</h2>
            </div>
            <LineChartComponent data={turnoverTrend} title="Evolução do Turnover (%)" lines={[{ key: 'Turnover', color: '#14B8A6' }]} />
            <LineChartComponent data={hiringTrend} title="Admissões vs. Desligamentos" lines={[{ key: 'Admissões', color: '#38BDF8' }, { key: 'Desligamentos', color: '#F472B6' }]} />
            <LineChartComponent data={payrollTrend} title="Custo Total da Folha" lines={[{ key: 'Custo', color: '#FBBF24' }]} formatAsCurrency />

             {latestMonth && (
                <>
                <div className="col-span-1 lg:col-span-2 xl:col-span-3 mt-6">
                    <h2 className="text-2xl font-bold mb-4 text-white">Dados do Último Mês ({latestMonth.monthYear})</h2>
                </div>
                 <div className="col-span-1 grid grid-cols-2 gap-6">
                    <MetricCard title="Turnover" value={`${(latestMonth.turnover.rate * 100).toFixed(2)}%`} icon={<UserMinusIcon />} />
                    <MetricCard title="Absenteísmo" value={`${latestMonth.absenteeism.rate.toFixed(2)}%`} icon={<CalendarIcon />} />
                 </div>
                 <div className="col-span-1">
                    <BarChartComponent data={Object.entries(latestMonth.payroll.byCostCenter).map(([name, value]) => ({ name, value }))} title="Folha por Centro de Custo" dataKey="value" nameKey="name" formatAsCurrency={true} />
                 </div>
                 <div className="col-span-1">
                    <PieChartComponent data={Object.entries(latestMonth.ageDemographics.ageRanges).map(([name, value]) => ({ name, value }))} title="Faixa Etária" />
                </div>
                </>
            )}
        </div>
    );
};


const Dashboard: React.FC<DashboardProps> = ({ data, viewMode }) => {
  if (viewMode === 'monthly') {
    return <MonthlyView monthData={data as MonthlyData} />;
  }
  return <GeneralView allData={data as Record<string, MonthlyData>} />;
};

export default Dashboard;