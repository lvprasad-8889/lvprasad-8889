build:
	cd Server && $(MAKE) build
	cd Client && $(MAKE) build

run:
	docker-compose up
	
stop:
    docker-compose down
