# Nuclio Minimalist Clone

Minimalist todo app clone for Nuclio Digital School

## Setup

Since we are using `docker-compose` is as easy as doing:

```shell
git clone https://github.com/vimtor/nuclio-minimalist-clone.git
cd nuclio-minimalist-clone
docker-compose up -d
```

Now you can access:

- Frontend in [http://localhost:3000](http://localhost:3000)
- Backend in [http://localhost:3001](http://localhost:3001)
- MongoDB in [http://localhost:3002](http://localhost:3002)

There is no need to do `docker-compose` at every change since it reloads automatically.

It is only needed when installing a new dependency
