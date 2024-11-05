import { Alert, AlertDescription } from "./ui/alert";

const NoData: React.FC = () => (
  <Alert variant="default">
    <AlertDescription>No data for the specified date range.</AlertDescription>
  </Alert>
);

export default NoData;
