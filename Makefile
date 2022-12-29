npm_install:
	docker-compose run node bash -c "npm install"

npm_compile:
	docker-compose run node bash -c "npm compile"

ts_standard:
	docker-compose run node bash -c "npx ts-standard"

ts_standard_fix:
	docker-compose run node bash -c "npx ts-standard --fix"

up:
	docker-compose up -d

logs:
	docker-compose logs -f

create_package:
	vsce package

publish_package:
	vsce publish