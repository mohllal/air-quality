# Air Quality Service

A RESTful API service responsible for providing air quality information of the nearest city to given GPS coordinates using the [IQAir](https://www.iqair.com/world-air-quality) APIs.

Technologies:

- TypeScript.
- NodeJS.
- Express.
- MongoDB.

## Components

### MongoDB database

The primary database where air quality data is stored in a collection named `airqualities`. This data mirrors the structure returned by the [IQAir API](https://api-docs.iqair.com/?version=latest#5ea0dcc1-78c3-4939-aa80-6d4929646b82).

Example document:

```json
{
  "latitude": 2.352222,
  "longitude": 2.352222,
  "pollution": {
    "ts": "2024-07-05T13:00:00.000Z",
    "aqius": 56,
    "mainus": "p2",
    "aqicn": 29,
    "maincn": "p1"
  },
  "createdAt": {
    "$date": "2024-07-05T13:56:01.027Z"
  },
  "__v": 0
}
```

### API server

An Express-based API server that provides two main endpoints:

#### Get pollution data of the nearest city

Endpoint: `GET /air_quality/nearest_city?latitude=<latitude>,longitude=<longitude>`

Retrieves pollution information for the nearest city to the specified coordinates.

Parameters:

- `latitude`: Latitude as a numerical value, within the range [-90, 90].
- `longitude`: Longitude as a numerical value, within the range [-180, 180].

Example response:

```json
{
    "pollution": {
        "ts": "2024-07-06T00:00:00.000Z",
        "aqius": 62,
        "mainus": "p2",
        "aqicn": 21,
        "maincn": "p2"
    }
}
```

#### Get the most polluted data for Paris

Endpoint: `GET /air_quality/paris_most_polluted_info`

Retrieves the pollution data for the time when the Paris area (latitude: 48.856613, longitude: 2.352222) was the most polluted.

Example response:

```json
{
    "pollution": {
        "ts": "2024-07-06T00:00:00.000Z",
        "aqius": 62,
        "mainus": "p2",
        "aqicn": 21,
        "maincn": "p2"
    }
}
```

### CRON job

A cron job runs every minute (configured via the `PARIS_TASK_TIME` environment variable) to poll pollution data for Paris and save it to the database.

This job operates as a separate workload to allow independent scaling of the cron job and the main API server.

## Usage

All services can be run using Docker Compose.

Create a `.env.dev` file to start the Docker Compose services. You can use the [`.env.template`](./.env.template) file as a template.

You need to replace the `IQAIR_API_KEY` env variable value placeholder with your actual IQAir API key.

To start the Docker Compose services, run:

```shell
docker-compose -f docker-compose.yml up

# or
make up
```

To stop the Docker Compose services, run:

```shell
docker-compose -f docker-compose.yml down

# or
make down
```

To run tests you need to create a `.env.test` file similiar the [`.env.template`](./.env.template). Then run:

```shell
docker-compose -f docker-compose.test.yml up

# or
make test
```

All Docker volume mounts for services will be located in the `docker` git-ignored directory.

Docker commands are included in a [`Makefile`](./Makefile). Run `make help` to see the available rules.
