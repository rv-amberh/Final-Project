FROM golang:1.17-alpine AS build
WORKDIR /go/src/github.com/rv-amberh/final-project
COPY . .

RUN go build -o server .

FROM alpine:3.15
EXPOSE 8000
COPY --from=build /go/src/github.com/rv-amberh/final-project/server /server
CMD ["/server"]
