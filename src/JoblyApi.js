import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);
    
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes
  /** Get a list of all of a specific handle. E.G : companies, jobs, users */

  static async getAll(handle) {
    let res = await this.request(`${handle}`);
    return res;
  }

  /** Get details on a company by handle. */
  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get companies by name */
  static async getCompanies(name) {
    let res = await this.request("companies", {name});
    return res.companies;
  }

  /** Get details on a job by handle. */
  static async getJob(handle) {
    let res = await this.request(`jobs/${handle}`);
    return res.job;
  }

  
  /** Get jobs by title */
  static async getJobs(title) {
    let res = await this.request("jobs", {title});
    return res.jobs;
  }

  /** Get details on a user by username. */
  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Apply to job. */
  static async applyToJob(username, id) {
    let res = await this.request(this.endpoint=`names/${username}/jobs/${id}`, {},"post")
    return res;
  }

  /** Login returns a token */
  static async login(data) {
    let res = await this.request(`auth/token`, data, "post");
    return res.token;
  }

  /** Signup */
  static async signup(data) {
    let res = await this.request(`auth/register`, data, "post");
    return res.token;
  }

  /** Save changes to profile */
  static async saveChanges(username, data) {
    console.log(username)
    console.log('in JoblyApi: ', data)
    let res = await this.request(`users/${username}`, data, "patch");
    console.log(res)
    return res.user
  }
}

// for now, put token ("testuser" / "password" on class)
// JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RhZG1pbiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYxNDcwMTI0NH0.wFtLqGvPMy67e-CeXfQkyBY8_DBkPdowpGi8-H0bJIc";


export {JoblyApi}