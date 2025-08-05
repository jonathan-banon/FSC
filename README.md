# FSC - Application Web Full Stack


## 🛠️ Technologies Utilisées

### Backend
- **Symfony 7.2** 
- **Doctrine ORM** 
- **Lexik JWT Authentication Bundle** 
- **PostgreSQL** 
- **Nelmio CORS Bundle** 

### Frontend
- **React 19** 
- **React Router DOM 7.3** 
- **React Bootstrap** 
- **Webpack Encore**

### Outils de développement
- **Webpack Encore** - Compilation des assets
- **Sass** - Préprocesseur CSS
- **Bootstrap 5.3** - Framework CSS
- **Docker Compose** - Containerisation
- **PHPUnit** - Tests unitaires


## 🚀 Installation

### Prérequis
- PHP >= 8.2
- Node.js >= 16
- Composer
- Docker et Docker Compose (optionnel)

### 1. Cloner le projet
```bash
git clone <url-du-repo>
cd FSC
```

### 2. Installation des dépendances PHP
```bash
composer install
```

### 3. Installation des dépendances JavaScript
```bash
npm install
```

### 4. Configuration de l'environnement
```bash
# Copier le fichier d'environnement
cp .env .env.local

# Modifier les variables d'environnement dans .env.local
# Notamment DATABASE_URL et JWT_PASSPHRASE
```

### 5. Générer les clés JWT
```bash
mkdir -p config/jwt
openssl genpkey -out config/jwt/private.pem -aes256 -algorithm rsa -pkcs8 -bits 4096
openssl pkey -in config/jwt/private.pem -out config/jwt/public.pem -pubout
```

### 6. Base de données

#### Avec Docker
```bash
docker-compose up -d
```

#### Sans Docker
Configurez votre PostgreSQL et modifiez DATABASE_URL dans .env.local

```bash
# Créer la base de données
php bin/console doctrine:database:create

# Exécuter les migrations
php bin/console doctrine:migrations:migrate
```

## 🏃‍♂️ Lancement de l'application

### 1. Démarrer le serveur Symfony
```bash
symfony serve -d
# ou
php -S localhost:8000 -t public/
```

### 2. Compiler les assets (en développement)
```bash
# Mode watch (recommandé pour le développement)
npm run watch

# ou compilation unique
npm run dev
```

### 3. Pour la production
```bash
npm run build
```

L'application sera accessible à l'adresse : http://localhost:8000

## 📚 API Endpoints

### Authentification
- `POST /api/userCreate` - Inscription d'un nouvel utilisateur
- `POST /api/login_check` - Connexion et génération du token JWT

### Utilisateurs
- `GET /api/getAllUsers` - Récupérer tous les utilisateurs (authentification requise)

### Exemple de requête d'inscription
```json
POST /api/userCreate
Content-Type: application/json

{
    "email": "user@example.com",
    "password": "motdepasse"
}
```

### Exemple de requête de connexion
```json
POST /api/login_check
Content-Type: application/json

{
    "email": "user@example.com",
    "password": "motdepasse"
}
```

## 🎨 Fonctionnalités

- ✅ Inscription d'utilisateurs
- ✅ Connexion avec JWT
- ✅ Interface React responsive
- ✅ Validation des formulaires
- ✅ Gestion des erreurs
- ✅ Routage côté client
- ✅ Design avec Bootstrap

## 🧪 Tests

```bash
# Exécuter tous les tests
php bin/phpunit

# Tests avec couverture
php bin/phpunit --coverage-html var/coverage
```

## 📦 Scripts disponibles

### Backend (Composer)
```bash
composer install          # Installation des dépendances
```

### Frontend (NPM)
```bash
npm run dev               # Build en mode développement
npm run watch             # Watch mode pour le développement
npm run build             # Build en mode production
npm run dev-server        # Serveur de développement Webpack
```

### Symfony
```bash
php bin/console cache:clear              # Vider le cache
php bin/console doctrine:migrations:migrate  # Migrations
php bin/console debug:router             # Voir les routes
```

## 🐳 Docker

Le projet inclut une configuration Docker Compose pour PostgreSQL :

```bash
# Démarrer les services
docker-compose up -d

# Arrêter les services
docker-compose down

# Voir les logs
docker-compose logs -f
```

## 🔧 Configuration

### Variables d'environnement importantes
- `DATABASE_URL` - URL de connexion à la base de données
- `JWT_SECRET_KEY` - Chemin vers la clé privée JWT
- `JWT_PUBLIC_KEY` - Chemin vers la clé publique JWT
- `JWT_PASSPHRASE` - Phrase de passe pour les clés JWT
- `APP_SECRET` - Secret de l'application Symfony

## 🤝 Contribution

1. Fork le projet
2. Créer une branche pour votre feature (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📝 Notes de développement

### Points d'attention
- Le fichier `Login.jsx` contient une erreur de syntaxe dans la requête fetch (ligne 17-18)
- Les inputs de mot de passe utilisent `type="text"` au lieu de `type="password"`
- Les attributs `name` manquent dans les inputs du formulaire de login

### Améliorations suggérées
- Ajouter la validation côté client
- Implémenter la gestion de tokens JWT côté React
- Ajouter des tests frontend
- Améliorer la gestion d'erreurs
- Implémenter un système de refresh token

## 📄 Licence

Ce projet est sous licence propriétaire.

## 👨‍💻 Auteur

**Jonathan Banon** - [jonathan-banon](https://github.com/jonathan-banon)

---

*Pour plus d'informations, consultez la documentation officielle de [Symfony](https://symfony.com/doc) et [React](https://react.dev).*
