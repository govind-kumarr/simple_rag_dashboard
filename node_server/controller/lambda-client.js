import { config } from "dotenv";

config();

export class Lambda_Client {
  constructor() {
    this.baseUrl = process.env.LAMBDAS_BASE_URL;
  }
  constructImageUrl(image_name) {
    return `${this.baseUrl}/avatars/${image_name}.png`;
  }
  async uploadImage(image_name, img) {
    const url = `${this.baseUrl}/avatars?image_name=${image_name}`;
    const response = await fetch(url, {
      method: "POST",
      body: img,
    });
    if (response.status === 200) {
      return true;
    }
    return false;
  }
}
