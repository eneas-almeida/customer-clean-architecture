packages:
	yarn install

build:
	yarn build

start:
	yarn start

test:
	yarn test

up:
	docker-compose up -d

down:
	docker-compose down

.PHONY: packages build start test up down
