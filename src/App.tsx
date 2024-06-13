import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import parseUrl from "parse-url";
import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import "./App.css";

function App() {
  const [value, setValue] = useState("");
  const [result, setResult] = useState<any>({});
  const [error, setError] = useState(false);

  const handleOnChange = (e: any) => {
    if (e.target.value.length === 0) {
      setError(false);
      setResult({});
    }
    setValue(e.target.value);
  };

  const parse = async () => {
    try {
      setError(false);
      setResult({});
      const res = await parseUrl(value);
      setResult(res.query);
    } catch (error: any) {
      setError(error);
    }
  };
  useEffect(() => {
    if (!value) {
      setError(false);
      setResult({});
      return;
    }
    parse();
  }, [value]);

  return (
    <div className="container mx-auto px-5">
      <div className="mt-10">
        <h1 className="text-7xl font-bold tracking-tight mb-6 text-center">
          Url Parser
        </h1>
        <h3 className="text-center text-zinc-500 mb-10">
          Paste/type your URL below and we will parse it to get the query
          parameters
        </h3>
        <Input
          className="p-6 text-lg"
          placeholder="Paste or type your URL here"
          onKeyUp={handleOnChange}
          onPaste={(e) => {
            setValue(e.clipboardData.getData("text"));
          }}
        />
      </div>
      {Object.keys(result).length ? (
        <div className="mt-10">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Query</TableHead>
                <TableHead>Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(result).map(([key, value]: any) => (
                <TableRow key={key}>
                  <TableCell className="font-medium text-left">{key}</TableCell>
                  <TableCell className="text-left">{value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : null}
      {error ? (
        <div className="error-alert mt-10">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Please provide a valid URL</AlertDescription>
          </Alert>
        </div>
      ) : null}
      <footer>
        <div className="mt-10 text-center">
          <p className="text-zinc-500">
            Developed by{" "}
            <a href="mailto:samuelstifnes@gmail.com">Stifnes Samuel</a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
