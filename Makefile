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

ammend:
	git add --all && git commit --amend --no-edit && git push origin main -f

.PHONY: packages build start test up down ammend
