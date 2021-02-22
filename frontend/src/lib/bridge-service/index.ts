import axios, { AxiosInstance } from "axios";
import { ok, err, Result } from "neverthrow";

export class BridgeClient {
  private httpClient: AxiosInstance;

  constructor(baseurl?: string) {
    this.httpClient = axios.create({
      baseURL: baseurl || "http://localhost:8080/api/",
      headers: {
        "Content-type": "application/json",
      },
    });
  }

  verifyPresentation = async (body: any): Promise<Result<Boolean, Error>> => {
    try {
      const resp = await this.httpClient.post("/presentations/verify", body);
      return ok(resp.status === 200);
    } catch (error) {
      return err(error);
    }
  };

  issueCredential = async (body: any): Promise<Result<any, Error>> => {
    try {
      const resp = await this.httpClient.post("/credentials/issue", body);
      return ok(resp.data);
    } catch (error) {
      return err(error);
    }
  };
}