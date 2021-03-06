import { Typography, Statistic, Card, Col, Progress} from "antd";
const { Text } = Typography;

interface ItemProps {
  title: string, 
  value: string,
  prefix: JSX.Element,
  color: string,
  progress?: boolean,
  centered: boolean,
};

export default function StatisticItem(props: ItemProps) {
  const { title, value, prefix } = props;
  const View = props.progress ? ProgressView : StatisticView;
  const style = props.centered ? {display: 'flex', alignItems: 'center', justifyContent: 'center'} : {};

  return (
    <Col span={8}>
      <Card>
        <div style={style}>
          <View {...props} />
        </div>
      </Card>
    </Col>
  );
}

function ProgressView({title, value, prefix, color}) {
  const endColor = value > 90 ? 'red' : color;
  const content = (
    <div>
    {prefix}
    <div><Text type="secondary">{title}</Text></div>
    <div><Text type="secondary">{value}%</Text></div>
    </div>
  )
  return (
    <Progress type="dashboard" percent={value} width={120} strokeColor={{
      '0%': color,
      '90%': endColor,
    }} format={percent => content} />
  )
}

function StatisticView({title, value, prefix, color}) {
  const valueStyle = { fontSize: "1.8rem" };

  return (
    <Statistic
    title={title}
    value={value}
    valueStyle={valueStyle}
    prefix={prefix}
  />
  )
}