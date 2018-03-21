# local intance of selenium

sel: selenium-start
sels: selenium-stop

selenium-start:
	/bin/bash local_selenium_server_ensure.sh

selenium-stop:
	/bin/bash local_selenium_server.sh stop
