.PHONEY: help


help: cat-banner
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

cat-banner:
	@clear && cat ./.banner


serve: ## Start server
	@clear && node ./index.js
