type Props = {
    label: string;
    value: string;
}
const Tech = ({ label, value } : Props) => (
  <div className="techSpecs">
    <p>{label}</p>
    <p className="techSpecs-value">{value}</p>
  </div>
);

export default Tech;