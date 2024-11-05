import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { Alert, AlertDescription } from './ui/alert';

interface ErrorProps {
  error: string;
}

const Error: React.FC<ErrorProps> = ({ error }: ErrorProps) => {
  return (
    <Alert variant="destructive">
      <ExclamationTriangleIcon />
      <AlertDescription className="mt-1">{error}</AlertDescription>
    </Alert>
  );
};

export default Error;
