packages:
	yarn install

dev:
	yarn dev

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

up/prod:
	docker-compose --env-file .prod.env -f docker-compose-prod.yml up -d

down/prod:
	docker-compose --env-file .prod.env -f docker-compose-prod.yml down

prod:
	docker build -t venzel/customer-api -f Dockerfile.prod .

ammend:
	git add --all && git commit --amend --no-edit && git push origin main -f

.PHONY: packages dev build start test up down up/prod down/prod prod ammend
