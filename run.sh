#!/bin/bash

function red {
    printf "\e[91m$1\e[0m\n"
}
function green {
    printf "\e[32m$1\e[0m\n"
}

if [ "$1" = "--help" ]; then

    cat << EOF

# run all and then run only changed (selective)
    /bin/bash $0 --watch

# every time run all
    /bin/bash $0 --watchAll

# run only one or matching test
    /bin/bash $0 test/veg.test.js
    /bin/bash $0 test/*e*.test.js
    /bin/bash $0 "[^a-z]tea"
EOF

    exit 0;
fi

echo -e "\n\n ┌────────────────────────────────────────────────────────────────────┐"
echo -e " │ sequence of checking || running local selenium server before tests │ "
echo -e " └────────────────────────────────────────────────────────────────────┘\n\n"
/bin/bash local_selenium_server_ensure.sh
echo -e "\n ┌────────────────────────────────────────────────────────────────────┐"
echo -e " │ sequence of checking || running local selenium server before tests │ "
echo -e " └────────────────────────────────────────────────────────────────────┘\n\n"

#node node_modules/.bin/jest $@ --verbose --runInBand --modulePathIgnorePatterns "test/examples" "test/minefield"

node node_modules/.bin/jest $@ --verbose --runInBand

#node node_modules/.bin/jest -t="redirection 2" --runInBand --modulePathIgnorePatterns "test/examples"

# other useful options
# --testNamePattern, -t           Run only tests with a name that matches the regex pattern.
#                                 Run tests that match this spec name (match against the name in describe or test, basically).
#           from : https://facebook.github.io/jest/docs/en/cli.html
#       example:
#           /bin/bash run.sh -t="redirection\s2"


STATUS=$?

if [ "$STATUS" == "0" ]; then

    green "\n    Tests passed\n";
else

    red "\n    Tests crashed\n";

    exit $STATUS
fi
