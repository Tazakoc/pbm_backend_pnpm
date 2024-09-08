# Use Node.js LTS version based on Alpine for a smaller image size
FROM node:lts-alpine AS development

# Install pnpm
RUN wget -qO /bin/pnpm "https://github.com/pnpm/pnpm/releases/latest/download/pnpm-linuxstatic-x64" && chmod +x /bin/pnpm

# Set the working directory in the container
WORKDIR /workspaces/authentication

# Copy the pnpm lock file and package.json to leverage Docker cache
COPY --chown=node:node pnpm-lock.yaml package.json ./

# Ensure NODE_ENV is set to development to install devDependencies
ENV NODE_ENV=development

# Fetch the dependencies
RUN pnpm fetch

# Copy the rest of the application code
COPY --chown=node:node . .

# Install dependencies
RUN pnpm install --no-cache --reporter=append-only

# Generate Prisma client
RUN pnpm prisma generate

# Switch to non-root user for security
USER root

# Set the command to run your application
#CMD ["sleep", "infinity"]
CMD ["pnpm", "run","start:dev"]
