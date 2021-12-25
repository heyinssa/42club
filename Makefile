# Vars =========================

PROJECT	=	42club
IMAGES	=	petercha2000/42club:0.0.1

# Rules =========================

all		: build clean

.PHONY:	build
build	:
	sudo docker-compose -f docker-compose.prod.yml build
	sudo docker-compose -f docker-compose.prod.yml push

.PHONY:	prod
prod	: clean
	sudo docker-compose -f docker-compose.prod.yml pull
	sudo docker-compose -f docker-compose.prod.yml -p $(PROJECT) up -d

.PHONY:	clean
clean	:
	@sudo docker rmi $(shell (sudo docker images --filter "dangling=true" -q --no-trunc)) 2>/dev/null | cat

.PHONY:	fclean
fclean	: clean
	sudo docker-compose -f docker-compose.prod.yml -p $(PROJECT) down
	sudo docker-compose -f docker-compose.prod.yml -p $(PROJECT) rm
	sudo docker rmi $(IMAGES)
