ng g interface models/user
ng g interface models/movie
ng g interface models/login-credentials

ng g s --skip-tests services/auth
ng g s --skip-tests services/user
ng g s --skip-tests services/movie
ng g s --skip-tests services/high-contrast

ng g guard guards/auth
ng g guard guards/admin

ng g c -s -t --skip-tests components/home --flat
ng g c -s -t --skip-tests components/login --flat
ng g c -s -t --skip-tests components/user-seatch --flat
ng g c -s -t --skip-tests components/user-details --flat
ng g c -s -t --skip-tests components/movie-details --flat
ng g c -s -t --skip-tests components/sidebar --flat