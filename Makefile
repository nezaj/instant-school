MAKEFLAGS = --no-print-directory --always-make --silent
MAKE = make $(MAKEFLAGS)

dev:
	@echo "Booting up dev..."
	npm run dev

bootstrap:
	@echo "Running bootstrap script..."
	curl localhost:3001/api/bootstrap
