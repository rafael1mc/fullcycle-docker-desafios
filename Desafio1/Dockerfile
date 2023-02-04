FROM golang:latest AS builder

WORKDIR /usr/src/app

COPY main.go .

RUN go build -o app main.go

FROM scratch

WORKDIR /app

COPY --from=builder /usr/src/app/app .

CMD [ "/app/app" ]