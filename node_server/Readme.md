## Requirements

To start dev server you will need to ensure some checks.

- MongDB
  - You will need to have a running instance of mongodb either on cloud or locally.If you want to get a running instance of mongodb locally you can [follow this guide](https://dev.to/speaklouder/mongodb-on-your-local-machine-using-docker-a-step-by-step-guide-4b2h).
- ChromaDB
  - You will also need a running instance of chroma. If you want to get a running instance of chroma locally you can [follow this guide](https://docs.trychroma.com/deployment#docker).

### Installtion

- To install dependencies do `npm install`
- To create a env file you copy `.env.example` file to `.env` and add necessary values there
- Finally to spin up dev server you can do `npm run dev` or `npm start`

