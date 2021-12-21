# Vars =========================

PROJECT	=	42club
IMAGES	=	petercha2000/42club:0.0.1

# Rules =========================

all		: build push clean

prod	: deploy clean

build	:
	sudo docker-compose -f docker-compose.prod.yml build

push	:
	sudo docker-compose -f docker-compose.prod.yml push

clean	:
	@sudo docker rmi $(shell (sudo docker images --filter "dangling=true" -q --no-trunc)) 2>/dev/null | cat

fclean	: clean
	sudo docker-compose -p $(PROJECT) down
	sudo docker-compose -f docker-compose.prod.yml -p $(PROJECT) rm
	sudo docker rmi $(IMAGES)

deploy	:
	sudo docker-compose -f docker-compose.prod.yml pull
	sudo docker-compose -f docker-compose.prod.yml -p $(PROJECT) up -d

re		: fclean all

.PHONY: all build push fclean re dist

