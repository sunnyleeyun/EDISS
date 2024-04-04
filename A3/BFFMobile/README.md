```
docker ps -a
docker rm {}
docker build -t sunny/nodejs-image-bffweb .
docker run --name nodejs-image-bffweb -p 80:80 -d sunny/nodejs-image-bffweb
docker logs {}
```