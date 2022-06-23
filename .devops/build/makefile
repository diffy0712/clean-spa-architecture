image-name=clean-spa-architecture-dockerimage

.PHONY: publish
publish: build push clear ## build and push docker image and clear

build: ## build docker image
	@[ "${tag}" ] || ( echo "tag is not set. available: dev, stg, 1.0.0 etc..."; exit 1 )
	docker build --target nginx -t ${image-name}:${tag}  ../../ -f ./Dockerfile

push: ## push docker image to registry
	@[ "${tag}" ] || ( echo "tag is not set. available: dev, stg, 1.0.0 etc..."; exit 1 )
	docker push ${image-name}:${tag}

clear: ## remove local image
	@[ "${tag}" ] || ( echo "tag is not set. available: dev, stg, 1.0.0 etc..."; exit 1 )
	docker rmi ${image-name}:${tag}

help: ## Display this help message
	@cat $(MAKEFILE_LIST) | grep -e "^[a-zA-Z_\-]*: *.*## *" | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
