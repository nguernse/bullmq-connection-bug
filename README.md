# Steps

## 1. Spin Up Redis

At root of project run:

```bash
docker compose up
```

## 2. Spin up API

```bash
cd /api
npm install
npm run dev
```

To test the API is up:

```bash
curl --request GET 'http://localhost:9999/health'
```

## 3. Spin up Worker

In the file `/worker/src/lib/workers/index.ts`, if you set the `host` connection to be "bad", then run:

```bash
cd /worker
npm install
npm run dev
```

Now if you do `ctrl+c`, it will continue to attempt a connection and log:

```
Error occured in worker getaddrinfo ENOTFOUND bad
```

# Add A Job

If you switch the bad connection to "localhost" you can make a `POST` request to the API to add a job. Everything works as expected then.

```bash
curl --request POST 'http://localhost:9999/job' \
  --header 'Content-Type: application/json' \
  --data '{ "x": 1, "y": 10, "name": "multiply" }'
```
