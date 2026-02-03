# Contributing Guidelines

## Development Workflow

### 1. Fork and Clone
```bash
git clone https://github.com/shahanth4444/multi-tenant-SaaS_.git
cd multi-tenant-SaaS_
```

### 2. Create Feature Branch
```bash
git checkout -b feature/your-feature-name
```

### 3. Make Changes
- Follow existing code style
- Add comments for complex logic
- Update documentation if needed

### 4. Test Your Changes
```bash
# Start Docker containers
docker-compose up -d

# Test manually
# Check logs for errors
docker logs backend
docker logs frontend
```

### 5. Commit Changes
```bash
git add .
git commit -m "feat: add your feature description"
```

### 6. Push and Create PR
```bash
git push origin feature/your-feature-name
```

## Commit Message Format

Use conventional commits:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance tasks

Examples:
```
feat: add user profile page
fix: resolve login authentication issue
docs: update API documentation
refactor: improve database query performance
```

## Code Style

### Backend (Node.js)
- Use ES6+ features
- Use async/await for async operations
- Follow existing naming conventions
- Add JSDoc comments for functions

### Frontend (React)
- Use functional components
- Use hooks for state management
- Follow existing component structure
- Add PropTypes or TypeScript (future)

## Pull Request Guidelines

1. Ensure all tests pass
2. Update documentation
3. Add description of changes
4. Reference related issues
5. Request review from maintainers

## Questions?

Open an issue or contact the maintainers.
