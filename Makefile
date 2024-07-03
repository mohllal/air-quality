.PHONY: $(shell grep -E '^\w+:' ${MAKEFILE_LIST} | cut -d':' -f1 | paste -sd' ' -)
.DEFAULT_GOAL := help

define PRINT_HELP_PYSCRIPT
import re, sys

for line in sys.stdin:
	match = re.match(r'^([a-zA-Z_-]+):.*?## (.*)$$', line)
	if match:
		target, help = match.groups()
		print("%-30s %s" % (target, help))
endef
export PRINT_HELP_PYSCRIPT

.EXPORT_ALL_VARIABLES:
COMPOSE_FILE ?= docker-compose.yml
COMPOSE_TEST_FILE ?= docker-compose.test.yml

help: ## List available commands
	@python3 -c "$$PRINT_HELP_PYSCRIPT" < $(MAKEFILE_LIST)

build: ## Build services in docker-compose.yml
	docker-compose --file $(COMPOSE_FILE) build --no-cache

up: ## Start services of docker-compose.yml
	docker-compose --file $(COMPOSE_FILE) up --remove-orphans --force-recreate

down: ## Stop services of docker-compose.yml
	docker-compose --file $(COMPOSE_FILE) down

logs: ## Follow logs of the express server
	docker-compose --file $(COMPOSE_FILE) logs api --follow

exec: ## Exec inside the express server
	docker-compose --file $(COMPOSE_FILE) exec api /bin/ash

test: ## Start test services of docker-compose.test.yml
	docker-compose --file $(COMPOSE_TEST_FILE) up --remove-orphans --abort-on-container-exit
