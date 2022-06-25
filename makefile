export compose=docker compose

.PHONY: start ## Start the environment
start:
	$(compose) up -d

.PHONY: restart ## Restart the environemnt
restart: down start

.PHONY: stop ## Stop the environment
stop:
	$(compose) stop

.PHONY: down ## Down the environment
down:
	$(compose) down -v

.PHONY: logs ## See logs of the environment, arg c for containers. e.g.: make logs c=proxy
logs:
	$(compose) logs -f $(c)

.PHONY: analyze
analyze: ## Run Sonarcube analyzer
	sonar-scanner \
		-Dsonar.projectKey=Clean-Spa-Architecture \
		-Dsonar.sources=src \
		-Dsonar.javascript.lcov.reportPaths=./coverage/lcov.info \
		-Dsonar.host.url=http://localhost:9000 \
		-Dsonar.login=sqp_0dd92137e9bca52fec1d50d54bec271c10c417f7 \
		-Dsonar.exclusions=src/**/*.test.*

.PHONY: help
help: ## Display this help message
	@cat $(MAKEFILE_LIST) | grep -e "^[a-zA-Z_\-]*: *.*## *" | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
