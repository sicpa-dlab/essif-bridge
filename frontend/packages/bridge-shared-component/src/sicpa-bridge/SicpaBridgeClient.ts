import axios, { AxiosInstance } from "axios"
import { BridgeClient, VerificationResult } from "./BridgeClient"
import { ok, err, Result } from "neverthrow"

export class SicpaBridgeClient implements BridgeClient {
  private httpClient: AxiosInstance

  constructor(baseurl?: string) {
    this.httpClient = axios.create({
      baseURL: baseurl || process.env.REACT_APP_BRIDGE_API_URL,
      headers: {
        "Content-type": "application/json",
      },
    })
  }

  verifyPresentation = async (body: any): Promise<Result<Boolean, Error>> => {
    try {
      const resp = await this.httpClient.post("/presentations/verify", body)
      return ok(resp.status === 200)
    } catch (error) {
      return err(error)
    }
  }

  verifyCredential = async (
    body: any
  ): Promise<Result<VerificationResult, Error>> => {
    try {
      const resp = await this.httpClient.post("/credentials/verify", body)
      return resp.status === 200 ? ok(resp.data) : err(resp.data)
    } catch (error) {
      return err(error)
    }
  }

  issueCredential = async (body: any): Promise<Result<any, Error>> => {
    try {
      const resp = await this.httpClient.post("/credentials/issue", body)
      return ok(resp.data)
    } catch (error) {
      return err(error)
    }
  }
}
