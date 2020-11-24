import React, { useCallback, useState } from 'react';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  BarSeries,
  Title,
  Legend,
  Tooltip
} from '@devexpress/dx-react-chart-material-ui';
import { makeStyles } from '@material-ui/core/styles';
import { Stack, Animation, EventTracker } from '@devexpress/dx-react-chart';
import { Paper, Theme } from '@material-ui/core';
import { countryToFlag } from '../../../utils/utils';
import CustomSpinner from '../CustomSpinner';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    margin: 'auto',
    flexDirection: 'row',
  },
  label: {
    whiteSpace: 'nowrap',
  },
}));

const Root = (props: any) => <Legend.Root {...props} className={useStyles().root} />

const Label = (props: any) => <Legend.Label className={useStyles().label} {...props} />

const series = [
  { name: 'Male', key: 'male', argumentField: 'country', color: '#ced4f7' },
  { name: 'Female', key: 'female', argumentField: 'country', color: '#ffbad2' },
];

const TooltipContent = ({
  data, text, style, tooltipData, target, ...props
}: any) => {
  const alignStyle = {
    ...style,
    paddingLeft: '10px',
  };

  const handleVal = useCallback((name?) => (name ? tooltipData[target.point][name] : tooltipData[target.point]), [tooltipData, target])

  const handleTooltipHeader = () => handleVal().tooltip

  const items = series.map(({ name, key, color }) => {
    const val = handleVal(key);
    return (
      <tr key={key}>
        <td>
          <svg width="10" height="10">
            <circle cx="5" cy="5" r="5" fill={color} />
          </svg>
        </td>
        <td>
          <Tooltip.Content style={alignStyle} text={`${name} ${name === 'Male' ? '♂' : '♀'}`} {...props} />
        </td>
        <td align="right">
          <Tooltip.Content style={alignStyle} text={val || 'NA'} {...props} />
        </td>
      </tr>
    );
  });

  const toolH = handleTooltipHeader();
  return (
    <>
      <table>
        <thead>
          <tr>
            <td>
              {countryToFlag(toolH.value)}
            </td>
            <td colSpan={2}>
              <strong>{toolH.label}</strong>
            </td>
          </tr>
        </thead>
        <tbody>
          {items}
        </tbody>
      </table>
    </>
  );
};

const chartData = (data: any) => data.reduce((acc: any, d: any) => {

  //const val = data.length > 100 ? d.country.value : d.country.label
  const val = d.country.value;

  const countryAlreadyExists = acc.filter((c: any) => c.country === val)[0]
  if (countryAlreadyExists) {
    const newAcc = acc.filter((c: any) => c.country !== val);
    const t = {
      ...countryAlreadyExists,
      [d.gender]: countryAlreadyExists[d.gender] + 1
    }
    return [...newAcc, t]
  }

  return [
    ...acc,
    {
      country: val,
      male: d.gender === 'male' ? 1 : 0,
      female: d.gender === 'female' ? 1 : 0,
      tooltip: {
        label: d.country.label,
        value: d.country.value,
      },
    }
  ]
}, []);

interface Props {
  data: any[],
  loading: boolean,
}

const TestingChart: React.FC<Props> = (props: Props) => {

  const [target, setTarget] = useState<any>();

  const changeTargetItem = (targetItem: any) => setTarget(targetItem);
  const cData = chartData(props.data);

  return (
    <Paper>
      {
        !props.loading
          ? (
            <Chart
              data={cData}
              height={550}
            >
              <ArgumentAxis />
              <ValueAxis />
              { series.map((s) => (
                <BarSeries
                  key={s.key}
                  name={s.name}
                  valueField={s.key}
                  argumentField={s.argumentField}
                  color={s.color}
                />
              ))}

              <Animation />
              <Legend position="bottom" rootComponent={Root} labelComponent={Label} />
              <Title text="Genders by Country" />
              <Stack
                stacks={[
                  { series: series.map((s) => s.name) },
                ]}
              />
              <EventTracker />
              <Tooltip
                contentComponent={() => (<TooltipContent tooltipData={cData} target={target}></TooltipContent>)}
                targetItem={target}
                onTargetItemChange={changeTargetItem}
              />
            </Chart>
          ) : (<CustomSpinner size={'4rem'} />)
      }
    </Paper>
  )
}

export default TestingChart;