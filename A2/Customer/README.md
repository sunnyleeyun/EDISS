```
docker ps -a
docker rm {}
docker build -t sunny/nodejs-image-customer .
docker run --name nodejs-image-customer -p 3000:3000 -d sunny/nodejs-image-customer
docker logs {}
```