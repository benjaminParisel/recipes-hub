# Project Name

Brief description of your project goes here.

## Getting Started

These instructions will help you get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository

git clone https://github.com/username/project-name.git
cd project-name

2. Install dependencies

npm install
# or
yarn install

3. Set up environment variables

cp .env.example .env.local
```
Edit `.env.local` with your configuration values.

### Development

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### MongDb setup

Create a cluster on https://cloud.mongodb.com/
Create a user to allow to access to this cluster

On .env, Add a DATASOURCE_URL entry with the url connection for the cluster

WARNING: Don't forget to add a **database name** ()
`DATABASE: The name of the database. Note that if you're using MongoDB Atlas, you need to manually append the database name to the connection URL because the environment link from MongoDB Atlas doesn't contain it.`

To instanciate data, just run the `npm run seed` command.

### Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

To start the production server:

```bash
npm run start
# or
yarn start
```

## Project Structure

```
├── components/     # React components
├── pages/         # Next.js pages
├── public/        # Static files
├── styles/        # CSS/SCSS files
└── utils/         # Utility functions
```

## Built With

- [Next.js](https://nextjs.org/) - The React Framework
- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [TypeScript](https://www.typescriptlang.org/) - JavaScript with syntax for types


## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details