# npm Advisor

Get advice on which npm packages might fit your environment.


### Getting Started

```bash
# Installation
npm install

# Starting the Project
npm run dev
```

### Project Directory Structure
```bash
┌── src
│   ├── @type
│   │   ├── dto                 (Collection of Data Transfer Object types)
│   │   ├── model               (Collection of domain-specific types)
│   │   └── utility             (Collection of utility types)
│   ├── api
│   │   ├── config              (Files for managing Axios configurations)
│   │   └── [domain api]        (API logic called within domain-specific pages)
│   ├── app                     (Collection of components directly connected to next routes)
│   │   ├── [domain page]
│   │   │   └── _Folders        (Collection of components used only within that page)
│   ├── component               (Collection of common components used globally)
│   ├── constant                (Collection of common constants)
│   ├── hook
│   └── service                 (Collection of functions containing global business logic)
```

### Packages
- react 19
- next.js 15
- typescript 5
- swr
- zustand
- tailwind
- axios