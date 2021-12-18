# Vars =========================

PROJECT_NAME    =       42club

IMAGE_NAME      =       42club
REPO            =       petercha2000
TAG             =       0.0.1
FULLIMAGE_NAME  =       $(REPO)/$(IMAGE_NAME):$(TAG)

# Rules =========================

all		: build push clean

server	: deploy clean

build	:
	sudo docker build -t $(FULLIMAGE_NAME) .

push	:
	sudo docker push $(FULLIMAGE_NAME)

clean	:
	@sudo docker rmi $(shell (sudo docker images --filter "dangling=true" -q --no-trunc)) 2>/dev/null | cat

fclean	: clean
	sudo docker rmi $(FULLIMAGE_NAME)

deploy	:
	sudo docker-compose pull
	sudo docker-compose -p $(PROJECT_NAME) up -d

re		: fclean all

.PHONY: all build push fclean re dist

