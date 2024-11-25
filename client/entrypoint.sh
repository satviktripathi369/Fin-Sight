#!/bin/bash
# entrypoint.sh
# This script is used for Kubernetes deployment to check and replace environment variables
# in the application before starting it.

echo "Running entrypoint.sh tasks..."

# Define a list of mandatory environment variables to check
MANDATORY_VARS=(
    "NEXT_PUBLIC_API_URL"
)

# Define a list of optional environment variables (no check needed)
OPTIONAL_VARS=(
    "NEXT_PUBLIC_ENV_1"
    "NEXT_PUBLIC_ENV_2"
)

# Check if each mandatory variable is set
for VAR in "${MANDATORY_VARS[@]}"; do
    if [ -z "${!VAR}" ]; then
        echo "$VAR is not set. Please set it and rerun the script."
        exit 1
    fi
done

# Combine mandatory and optional variables for replacement
ALL_VARS=("${MANDATORY_VARS[@]}" "${OPTIONAL_VARS[@]}")

# Build sed expression string for all variables
sed_expression=""
for VAR in "${ALL_VARS[@]}"; do
    if [ ! -z "${!VAR}" ]; then
        # Use actual variable values in the sed expression
        sed_expression+=" -e 's~BAKED_${VAR}~${!VAR}~g'"
    fi
done

# Execute sed with the built expressions
if [ ! -z "$sed_expression" ]; then
    eval "find /app/public /app/.next -type f -name '*.js' -exec sed -i $sed_expression {} +"
fi

exec "$@"