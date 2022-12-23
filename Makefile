npm_install:
	docker-compose run node bash -c "npm install"

npm_compile:
	docker-compose run node bash -c "npm compile"

up:
	docker-compose up -d

logs:
	docker-compose logs -f