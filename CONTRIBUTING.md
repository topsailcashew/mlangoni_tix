# Contributing to MlangoniTix

First off, thank you for considering contributing to MlangoniTix! It's people like you that make MlangoniTix such a great tool.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Process](#development-process)
- [Style Guidelines](#style-guidelines)
- [Commit Messages](#commit-messages)
- [Pull Request Process](#pull-request-process)

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

### Our Pledge

We pledge to make participation in our project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards

**Examples of behavior that contributes to creating a positive environment include:**

- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

**Examples of unacceptable behavior include:**

- The use of sexualized language or imagery
- Trolling, insulting/derogatory comments, and personal or political attacks
- Public or private harassment
- Publishing others' private information without explicit permission
- Other conduct which could reasonably be considered inappropriate in a professional setting

## Getting Started

### Prerequisites

- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)
- Git
- A Gemini API key (for testing AI features)

### Setting Up Your Development Environment

1. **Fork the repository** on GitHub

2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/mlangoni_tix.git
   cd mlangoni_tix
   ```

3. **Add the upstream repository**:
   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/mlangoni_tix.git
   ```

4. **Install dependencies**:
   ```bash
   npm install
   ```

5. **Set up environment variables**:
   ```bash
   cp .env.example .env.local
   # Edit .env.local and add your GEMINI_API_KEY
   ```

6. **Start the development server**:
   ```bash
   npm run dev
   ```

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples** to demonstrate the steps
- **Describe the behavior you observed** and what you expected
- **Include screenshots** if applicable
- **Specify your environment**: OS, Node version, browser version

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- **Use a clear and descriptive title**
- **Provide a detailed description** of the suggested enhancement
- **Explain why this enhancement would be useful**
- **List any alternatives** you've considered

### Your First Code Contribution

Unsure where to begin? Look for issues labeled:

- `good first issue` - Simple issues perfect for newcomers
- `help wanted` - Issues where we need community help
- `bug` - Bug fixes needed
- `enhancement` - New features or improvements

## Development Process

### Branching Strategy

We use Git Flow:

- `main` - Production-ready code
- `develop` - Integration branch for features
- `feature/*` - New features
- `bugfix/*` - Bug fixes
- `hotfix/*` - Urgent production fixes

### Making Changes

1. **Create a new branch** from `develop`:
   ```bash
   git checkout develop
   git pull upstream develop
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following our [Style Guidelines](#style-guidelines)

3. **Write or update tests** if applicable

4. **Run the linter and type checker**:
   ```bash
   npm run lint
   npm run type-check
   ```

5. **Format your code**:
   ```bash
   npm run format
   ```

6. **Test your changes** thoroughly:
   ```bash
   npm run dev
   npm run build
   ```

7. **Commit your changes** following our [Commit Message Guidelines](#commit-messages)

## Style Guidelines

### TypeScript Style Guide

- Use TypeScript for all new files
- Enable strict type checking
- Avoid using `any` type
- Prefer interfaces over type aliases for object types
- Use meaningful variable and function names

### React Style Guide

- Use functional components with hooks
- Follow the existing component structure
- Keep components small and focused
- Use proper prop types
- Implement error boundaries where appropriate

### Code Formatting

We use Prettier for code formatting. The configuration is in `.prettierrc`:

```bash
# Format all files
npm run format

# Check formatting
npm run format:check
```

### Naming Conventions

- **Components**: PascalCase (e.g., `EventCard.tsx`)
- **Files**: PascalCase for components, camelCase for utilities
- **Variables/Functions**: camelCase
- **Constants**: UPPER_SNAKE_CASE
- **Types/Interfaces**: PascalCase

## Commit Messages

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no code change)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```
feat(tickets): add QR code generation for tickets

Implement QR code generation using qrcode library.
Each ticket now gets a unique QR code for verification.

Closes #123
```

```
fix(auth): resolve login modal state issue

The login modal wasn't closing properly after successful login.
Fixed by properly managing the modal state.

Fixes #456
```

## Pull Request Process

1. **Update documentation** if needed

2. **Ensure all tests pass** and code is properly formatted:
   ```bash
   npm run lint
   npm run type-check
   npm run format:check
   ```

3. **Update the README.md** if you're adding new features

4. **Create a Pull Request** with:
   - Clear title and description
   - Reference to related issues
   - Screenshots (if UI changes)
   - Testing steps

5. **Request review** from maintainers

6. **Address review comments** promptly

7. **Ensure CI checks pass**

### PR Title Format

Follow the same format as commit messages:

```
feat: Add user profile management
fix: Resolve ticket verification bug
docs: Update installation instructions
```

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Related Issues
Closes #123

## Testing
Steps to test the changes

## Screenshots (if applicable)
Add screenshots here

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests added/updated
- [ ] All tests passing
```

## Additional Notes

### Issue and Pull Request Labels

- `bug` - Something isn't working
- `enhancement` - New feature or request
- `documentation` - Documentation improvements
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention needed
- `question` - Further information requested
- `wontfix` - This will not be worked on
- `duplicate` - This issue/PR already exists
- `invalid` - This doesn't seem right

### Getting Help

If you need help:

1. Check the [README.md](README.md)
2. Search existing issues
3. Ask in discussions
4. Contact maintainers

## Recognition

Contributors will be recognized in:

- README.md contributors section
- Release notes
- Project website (when available)

---

Thank you for contributing to MlangoniTix! 🎉
