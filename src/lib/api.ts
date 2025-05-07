import axios from "axios";

export const api = axios.create({
   baseURL: "https://abdelhaqelamraoui-mcp.hf.space",
   headers: {
      "Content-Type": "application/json",
      "X-API-Key": process.env.NEXT_PUBLIC_API_KEY,
   },
});
