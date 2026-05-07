import json

data = [
  {
    "id": "math-01",
    "titre": "Suites numériques",
    "contenu": """<h3>1. Suites arithmétiques</h3>
<p>Une suite <strong>arithmétique</strong> est une suite dans laquelle on passe d'un terme au suivant en ajoutant toujours la même valeur appelée <strong>raison r</strong>.</p>
<ul>
  <li><strong>Terme général :</strong> <code>u(n) = u(0) + n × r</code></li>
  <li><strong>Somme des n premiers termes :</strong> <code>S = n × (u₀ + uₙ₋₁) / 2</code></li>
  <li><strong>Identification :</strong> calculer <code>u(n+1) − u(n)</code> → si constante = raison r</li>
</ul>
<p><strong>Exemple :</strong> Suite 3, 7, 11, 15, … → r = 4, u(n) = 3 + 4n<br>
Somme des 10 premiers termes : S = 10 × (3 + 39) / 2 = <strong>210</strong></p>

<h3>2. Suites géométriques</h3>
<p>Une suite <strong>géométrique</strong> est une suite dans laquelle on passe d'un terme au suivant en multipliant toujours par la même valeur appelée <strong>raison q</strong>.</p>
<ul>
  <li><strong>Terme général :</strong> <code>u(n) = u(0) × qⁿ</code></li>
  <li><strong>Somme (q ≠ 1) :</strong> <code>S = u₀ × (1 − qⁿ) / (1 − q)</code></li>
  <li><strong>Identification :</strong> calculer <code>u(n+1) / u(n)</code> → si constante = raison q</li>
</ul>
<p><strong>Exemple :</strong> Suite 2, 6, 18, 54, … → q = 3, u(n) = 2 × 3ⁿ<br>
u(5) = 2 × 3⁵ = 2 × 243 = <strong>486</strong></p>

<h3>3. Applications informatiques</h3>
<ul>
  <li><strong>Amortissement linéaire :</strong> suite arithmétique de raison négative</li>
  <li><strong>Intérêts composés :</strong> Capital = C₀ × (1 + t)ⁿ → suite géométrique</li>
  <li><strong>Croissance exponentielle :</strong> nombre d'abonnés, trafic réseau</li>
  <li><strong>Algorithme récursif :</strong> la suite de Fibonacci suit u(n) = u(n-1) + u(n-2)</li>
</ul>

<h3>4. Exercices résolus</h3>
<p><strong>Exercice 1 :</strong> Un capital de 5000 € est placé à 3 % d'intérêts composés par an. Quelle est sa valeur après 5 ans ?</p>
<p><em>Solution :</em> C(n) = 5000 × (1,03)ⁿ → C(5) = 5000 × 1,1593 = <strong>5796,37 €</strong></p>

<p><strong>Exercice 2 :</strong> Une suite arithmétique a pour premier terme u₀ = 10 et raison r = 5. Calculer u₇ et la somme des 8 premiers termes.</p>
<p><em>Solution :</em> u₇ = 10 + 7×5 = <strong>45</strong>. S = 8×(10+45)/2 = 8×27,5 = <strong>220</strong></p>

<p><strong>Exercice 3 :</strong> Le nombre de tickets d'une application double chaque mois. En janvier : 100 tickets. Combien en juillet ?</p>
<p><em>Solution :</em> u(n) = 100 × 2ⁿ. Juillet = mois 6 → u(6) = 100 × 64 = <strong>6400 tickets</strong></p>

<p><strong>Exercice 4 :</strong> Identifier si la suite 5, 10, 20, 40 est arithmétique ou géométrique, puis trouver le terme u₅.</p>
<p><em>Solution :</em> 10/5 = 2, 20/10 = 2 → suite géométrique de raison 2. u₅ = 5 × 2⁵ = <strong>160</strong></p>

<p><strong>Exercice 5 :</strong> Amortissement : un serveur vaut 12000 €. Il perd 2000 € de valeur par an. En quelle année sa valeur est-elle nulle ?</p>
<p><em>Solution :</em> u(n) = 12000 − 2000n = 0 → n = 6 → après <strong>6 ans</strong></p>""",
    "points_cles": [
      "Suite arithmétique : u(n) = u(0) + n×r | Somme = n×(u₀+uₙ)/2",
      "Suite géométrique : u(n) = u(0)×qⁿ | Somme = u₀×(1−qⁿ)/(1−q)",
      "Identifier une suite : différences constantes → arithmétique | ratios constants → géométrique",
      "Intérêts composés = suite géométrique de raison (1+taux)",
      "Fibonacci : u(n) = u(n−1) + u(n−2), base de la récursivité en programmation"
    ],
    "liens": []
  },
  {
    "id": "math-02",
    "titre": "Statistiques et probabilités",
    "contenu": """<h3>1. Statistiques descriptives</h3>
<p>Les statistiques permettent d'analyser et de résumer des données numériques.</p>
<table>
  <tr><td><strong>Moyenne</strong></td><td>x̄ = (Σxᵢ) / n</td></tr>
  <tr><td><strong>Médiane</strong></td><td>Valeur centrale des données triées</td></tr>
  <tr><td><strong>Mode</strong></td><td>Valeur la plus fréquente</td></tr>
  <tr><td><strong>Variance</strong></td><td>σ² = (Σ(xᵢ − x̄)²) / n</td></tr>
  <tr><td><strong>Écart-type</strong></td><td>σ = √variance</td></tr>
</table>
<p><strong>Exemple numérique :</strong> Temps de réponse serveur (ms) : 12, 15, 10, 14, 18, 11<br>
Moyenne = (12+15+10+14+18+11)/6 = <strong>13,33 ms</strong><br>
Variance = [(12-13,33)²+(15-13,33)²+(10-13,33)²+(14-13,33)²+(18-13,33)²+(11-13,33)²] / 6 = <strong>7,22</strong><br>
Écart-type = √7,22 = <strong>2,69 ms</strong></p>

<h3>2. Probabilités fondamentales</h3>
<ul>
  <li><strong>Probabilité :</strong> P(A) = nombre de cas favorables / nombre de cas totaux</li>
  <li><strong>Complémentaire :</strong> P(Ā) = 1 − P(A)</li>
  <li><strong>Union :</strong> P(A ∪ B) = P(A) + P(B) − P(A ∩ B)</li>
  <li><strong>Indépendance :</strong> P(A ∩ B) = P(A) × P(B)</li>
  <li><strong>Loi des grands nombres :</strong> la fréquence tend vers la probabilité quand n → ∞</li>
</ul>

<h3>3. Loi binomiale B(n, p)</h3>
<p>Si X suit une loi binomiale B(n, p), alors :</p>
<ul>
  <li><code>P(X = k) = C(n,k) × pᵏ × (1−p)^(n−k)</code></li>
  <li><strong>Espérance :</strong> E(X) = n × p</li>
  <li><strong>Variance :</strong> V(X) = n × p × (1−p)</li>
  <li>Combinaisons : <code>C(n,k) = n! / (k! × (n−k)!)</code></li>
</ul>
<p><strong>Exemple :</strong> Un serveur tombe en panne avec probabilité p = 0,1 par jour. Sur 5 jours, P(exactement 2 pannes) ?<br>
P(X=2) = C(5,2) × 0,1² × 0,9³ = 10 × 0,01 × 0,729 = <strong>0,0729 (7,29 %)</strong></p>

<h3>4. Applications informatiques</h3>
<ul>
  <li><strong>Analyse de logs :</strong> fréquence d'erreurs, temps moyen entre pannes (MTBF)</li>
  <li><strong>Taux de disponibilité :</strong> P(service disponible) = 1 − P(panne)</li>
  <li><strong>Tests de charge :</strong> distribution des temps de réponse</li>
  <li><strong>Détection d'anomalies :</strong> valeurs à plus de 2σ de la moyenne = suspect</li>
</ul>

<h3>5. Exercices résolus</h3>
<p><strong>Exercice 1 :</strong> Températures CPU (°C) : 55, 62, 58, 70, 65, 60. Calculer moyenne et écart-type.</p>
<p><em>Solution :</em> x̄ = 370/6 = 61,67 °C. Variance = 24,22. σ = <strong>4,92 °C</strong></p>

<p><strong>Exercice 2 :</strong> Sur 200 paquets réseau, 8 sont corrompus. Quelle est la probabilité d'un paquet corrompu ?</p>
<p><em>Solution :</em> P = 8/200 = <strong>0,04 soit 4 %</strong></p>

<p><strong>Exercice 3 :</strong> Loi binomiale B(10 ; 0,05). Calculer P(X = 0) et E(X).</p>
<p><em>Solution :</em> P(X=0) = 0,95¹⁰ ≈ <strong>0,599 (59,9 %)</strong>. E(X) = 10 × 0,05 = <strong>0,5</strong></p>

<p><strong>Exercice 4 :</strong> Médiane de : 3, 7, 2, 8, 5, 1, 9. Triés : 1,2,3,5,7,8,9. Médiane = 4ème valeur = <strong>5</strong></p>

<p><strong>Exercice 5 :</strong> Un antivirus détecte 95 % des virus. Sur 20 virus, P(tous détectés) ?</p>
<p><em>Solution :</em> P = 0,95²⁰ ≈ <strong>0,358 (35,8 %)</strong></p>""",
    "points_cles": [
      "Moyenne = Σxᵢ/n | Variance = Σ(xᵢ−x̄)²/n | Écart-type = √variance",
      "Loi binomiale B(n,p) : P(X=k) = C(n,k)×pᵏ×(1-p)^(n-k)",
      "Espérance binomiale : E(X) = n×p",
      "Application IT : MTBF, taux de disponibilité, analyse de logs",
      "Anomalie statistique : valeur > x̄ + 2σ"
    ],
    "liens": []
  },
  {
    "id": "math-03",
    "titre": "Fonctions et dérivées",
    "contenu": """<h3>1. Familles de fonctions</h3>
<table>
  <tr><th>Fonction</th><th>Expression</th><th>Domaine</th><th>Comportement</th></tr>
  <tr><td>Affine</td><td>f(x) = ax + b</td><td>ℝ</td><td>Droite, pente a</td></tr>
  <tr><td>Polynomiale</td><td>f(x) = axⁿ + …</td><td>ℝ</td><td>Courbe, degré n</td></tr>
  <tr><td>Exponentielle</td><td>f(x) = eˣ</td><td>ℝ</td><td>Croissance rapide</td></tr>
  <tr><td>Logarithmique</td><td>f(x) = ln(x)</td><td>]0; +∞[</td><td>Croissance lente</td></tr>
  <tr><td>Inverse</td><td>f(x) = 1/x</td><td>ℝ \ {0}</td><td>Hyperbole</td></tr>
</table>

<h3>2. Règles de dérivation</h3>
<ul>
  <li><code>(u + v)' = u' + v'</code></li>
  <li><code>(k × u)' = k × u'</code></li>
  <li><code>(uv)' = u'v + uv'</code></li>
  <li><code>(u/v)' = (u'v − uv') / v²</code></li>
  <li><code>(uⁿ)' = n × u^(n−1) × u'</code></li>
  <li><code>(eˣ)' = eˣ</code> | <code>(ln x)' = 1/x</code></li>
</ul>
<p><strong>Exemple :</strong> f(x) = 3x² + 2x − 5 → f'(x) = 6x + 2<br>
Point critique : f'(x) = 0 → 6x + 2 = 0 → x = −1/3</p>

<h3>3. Tableaux de variation</h3>
<p>Pour dresser un tableau de variation :</p>
<ol>
  <li>Calculer f'(x)</li>
  <li>Résoudre f'(x) = 0 → trouver les valeurs critiques</li>
  <li>Signe de f'(x) sur chaque intervalle → direction de f</li>
  <li>Calculer f aux points critiques</li>
</ol>
<p><strong>Exemple :</strong> f(x) = x² − 4x + 3 → f'(x) = 2x − 4 → f'(x) = 0 pour x = 2<br>
f(2) = 4 − 8 + 3 = −1 (minimum). f croissante sur ]2; +∞[ et décroissante sur ]−∞; 2[</p>

<h3>4. Applications informatiques</h3>
<ul>
  <li><strong>Optimisation :</strong> minimiser le temps de réponse, maximiser le débit</li>
  <li><strong>Courbes de performance :</strong> exponentielle pour la charge CPU</li>
  <li><strong>Complexité algorithmique :</strong> O(n²) = fonction polynomiale</li>
  <li><strong>Sécurité :</strong> ln(2¹²⁸) pour estimer la sécurité cryptographique</li>
</ul>

<h3>5. Exercices résolus</h3>
<p><strong>Exercice 1 :</strong> Dériver f(x) = 2x³ − 5x² + x − 3</p>
<p><em>Solution :</em> f'(x) = <strong>6x² − 10x + 1</strong></p>

<p><strong>Exercice 2 :</strong> Dériver g(x) = (2x+1)/(x−3)</p>
<p><em>Solution :</em> g'(x) = [2(x−3) − (2x+1)(1)] / (x−3)² = (2x−6−2x−1)/(x−3)² = <strong>−7/(x−3)²</strong></p>

<p><strong>Exercice 3 :</strong> f(x) = eˣ − x. Trouver le minimum.</p>
<p><em>Solution :</em> f'(x) = eˣ − 1 = 0 → eˣ = 1 → x = 0. f(0) = 1 → minimum en <strong>x = 0, valeur 1</strong></p>

<p><strong>Exercice 4 :</strong> f(x) = x² − 6x + 8. Dresser le tableau de variation.</p>
<p><em>Solution :</em> f'(x) = 2x − 6 = 0 → x = 3. f(3) = 9−18+8 = −1.<br>
Décroissante sur ]−∞;3[, minimum −1 en x=3, croissante sur ]3;+∞[</p>""",
    "points_cles": [
      "Dérivée mesure la pente instantanée (vitesse de variation)",
      "(uv)' = u'v + uv' | (u/v)' = (u'v - uv')/v²",
      "Minimum/maximum : f'(x) = 0, puis signe de f'",
      "(eˣ)' = eˣ | (ln x)' = 1/x",
      "Application : optimisation de performances, complexité algorithmique"
    ],
    "liens": []
  },
  {
    "id": "math-04",
    "titre": "Algorithmique et programmation",
    "contenu": """<h3>1. Structures de contrôle</h3>
<p><strong>Condition (if/else) :</strong></p>
<pre><code>if temperature > 80:
    alerter("CPU surchauffe")
elif temperature > 60:
    print("Température élevée")
else:
    print("Normal")</code></pre>

<p><strong>Boucle for :</strong></p>
<pre><code>for i in range(10):
    print(f"Paquet {i} envoyé")</code></pre>

<p><strong>Boucle while :</strong></p>
<pre><code>tentatives = 0
while tentatives < 3:
    if connexion_reussie():
        break
    tentatives += 1</code></pre>

<p><strong>Fonctions :</strong></p>
<pre><code>def calculer_moyenne(notes):
    return sum(notes) / len(notes)

result = calculer_moyenne([12, 15, 18, 10])
print(result)  # 13.75</code></pre>

<h3>2. Complexité algorithmique</h3>
<table>
  <tr><th>Notation</th><th>Nom</th><th>Exemple</th></tr>
  <tr><td>O(1)</td><td>Constante</td><td>Accès tableau par index</td></tr>
  <tr><td>O(log n)</td><td>Logarithmique</td><td>Recherche binaire</td></tr>
  <tr><td>O(n)</td><td>Linéaire</td><td>Parcours liste</td></tr>
  <tr><td>O(n log n)</td><td>Quasi-linéaire</td><td>Tri fusion</td></tr>
  <tr><td>O(n²)</td><td>Quadratique</td><td>Tri à bulles</td></tr>
  <tr><td>O(2ⁿ)</td><td>Exponentielle</td><td>Récursif naïf</td></tr>
</table>

<h3>3. Algorithmes de tri et recherche</h3>
<p><strong>Recherche binaire O(log n) :</strong></p>
<pre><code>def recherche_binaire(liste, cible):
    gauche, droite = 0, len(liste) - 1
    while gauche <= droite:
        milieu = (gauche + droite) // 2
        if liste[milieu] == cible:
            return milieu
        elif liste[milieu] < cible:
            gauche = milieu + 1
        else:
            droite = milieu - 1
    return -1</code></pre>

<p><strong>Tri fusion O(n log n) :</strong></p>
<pre><code>def tri_fusion(liste):
    if len(liste) <= 1:
        return liste
    milieu = len(liste) // 2
    gauche = tri_fusion(liste[:milieu])
    droite = tri_fusion(liste[milieu:])
    return fusionner(gauche, droite)</code></pre>

<h3>4. Récursivité</h3>
<p>Une fonction récursive s'appelle elle-même. Toujours prévoir un <strong>cas de base</strong> !</p>
<pre><code>def factorielle(n):
    if n == 0:    # cas de base
        return 1
    return n * factorielle(n - 1)  # appel récursif

def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)</code></pre>

<h3>5. Exercices résolus</h3>
<p><strong>Exercice 1 :</strong> Écrire une fonction Python qui calcule la somme d'une liste.</p>
<pre><code># Solution :
def somme_liste(lst):
    total = 0
    for x in lst:
        total += x
    return total
# Ou simplement : sum([1,2,3,4]) = 10</code></pre>

<p><strong>Exercice 2 :</strong> Quelle est la complexité d'une recherche linéaire dans une liste de n éléments ?</p>
<p><em>Solution :</em> <strong>O(n)</strong> — dans le pire cas, on parcourt tous les éléments.</p>

<p><strong>Exercice 3 :</strong> Écrire une fonction récursive pour calculer 2ⁿ.</p>
<pre><code>def puissance2(n):
    if n == 0:
        return 1
    return 2 * puissance2(n - 1)</code></pre>

<p><strong>Exercice 4 :</strong> Analyser : for i in range(n): for j in range(n): print(i,j). Complexité ?</p>
<p><em>Solution :</em> Double boucle imbriquée → <strong>O(n²)</strong></p>

<p><strong>Exercice 5 :</strong> Écrire un algorithme pour compter le nombre de paquets perdus dans une liste.</p>
<pre><code>def compter_perdus(paquets):
    return sum(1 for p in paquets if p["etat"] == "perdu")
# Complexité : O(n)</code></pre>""",
    "points_cles": [
      "if/elif/else : conditions | for/while : boucles | def : fonctions",
      "O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ)",
      "Récursivité : toujours prévoir un cas de base pour éviter la boucle infinie",
      "Recherche binaire : O(log n) — beaucoup plus rapide que O(n) pour grandes listes",
      "Tri fusion O(n log n) > tri bulles O(n²) pour grands volumes"
    ],
    "liens": []
  },
  {
    "id": "math-05",
    "titre": "Logique et ensembles",
    "contenu": """<h3>1. Opérations logiques fondamentales</h3>
<table>
  <tr><th>Opération</th><th>Symbole</th><th>Description</th><th>Vrai si…</th></tr>
  <tr><td>ET (AND)</td><td>∧</td><td>A ET B</td><td>A et B tous les deux vrais</td></tr>
  <tr><td>OU (OR)</td><td>∨</td><td>A OU B</td><td>Au moins un vrai</td></tr>
  <tr><td>NON (NOT)</td><td>¬</td><td>NON A</td><td>A est faux</td></tr>
  <tr><td>XOR</td><td>⊕</td><td>A XOR B</td><td>Exactement un vrai</td></tr>
  <tr><td>NAND</td><td>↑</td><td>NON(A ET B)</td><td>Pas les deux vrais</td></tr>
  <tr><td>NOR</td><td>↓</td><td>NON(A OU B)</td><td>Aucun vrai</td></tr>
</table>

<h3>2. Tables de vérité</h3>
<table>
  <tr><th>A</th><th>B</th><th>A∧B</th><th>A∨B</th><th>¬A</th><th>A⊕B</th></tr>
  <tr><td>0</td><td>0</td><td>0</td><td>0</td><td>1</td><td>0</td></tr>
  <tr><td>0</td><td>1</td><td>0</td><td>1</td><td>1</td><td>1</td></tr>
  <tr><td>1</td><td>0</td><td>0</td><td>1</td><td>0</td><td>1</td></tr>
  <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>0</td><td>0</td></tr>
</table>

<h3>3. Lois de De Morgan</h3>
<ul>
  <li><code>¬(A ∧ B) = ¬A ∨ ¬B</code></li>
  <li><code>¬(A ∨ B) = ¬A ∧ ¬B</code></li>
</ul>
<p>Application en firewall : bloquer si (NON admin ET NON VPN) = bloquer si (NON admin) OU (NON VPN)</p>

<h3>4. Théorie des ensembles</h3>
<ul>
  <li><strong>Union A ∪ B :</strong> éléments dans A ou B (ou les deux)</li>
  <li><strong>Intersection A ∩ B :</strong> éléments dans A et B</li>
  <li><strong>Complémentaire Ā :</strong> éléments pas dans A</li>
  <li><strong>Différence A \ B :</strong> éléments dans A mais pas dans B</li>
</ul>
<p><strong>Exemple :</strong> A = {1,2,3,4} et B = {3,4,5,6}<br>
A ∪ B = {1,2,3,4,5,6} | A ∩ B = {3,4} | A \ B = {1,2}</p>

<h3>5. Applications en informatique</h3>
<pre><code># Logique dans les conditions Python :
# AND = et
if age >= 18 and possede_carte:
    acceder()

# OR = ou
if erreur_reseau or timeout:
    retenter()

# NOT = pas
if not authentifie:
    rediriger_login()

# XOR en Python :
a = 0b1010
b = 0b1100
print(bin(a ^ b))  # 0b0110 — chiffrement simple</code></pre>

<h3>6. Exercices résolus</h3>
<p><strong>Exercice 1 :</strong> Compléter la table de vérité de (A ∧ B) ∨ ¬A</p>
<p><em>Solution :</em> 0∨1=1 | 0∨1=1 | 0∨0=0 | 1∨0=1 → résultat : 1,1,0,1</p>

<p><strong>Exercice 2 :</strong> Simplifier avec De Morgan : ¬(port_ouvert ∧ ¬firewall_actif)</p>
<p><em>Solution :</em> = ¬port_ouvert ∨ firewall_actif → bloquer si port fermé OU firewall actif</p>

<p><strong>Exercice 3 :</strong> Deux groupes AD : Admins = {Alice, Bob, Carol}, Réseau = {Bob, David, Eve}. Qui a les deux rôles ?</p>
<p><em>Solution :</em> Admins ∩ Réseau = <strong>{Bob}</strong></p>

<p><strong>Exercice 4 :</strong> En Python, écrire une condition : accès si (admin OU (utilisateur ET heure_bureau))</p>
<pre><code>if admin or (utilisateur and heure_bureau):
    autoriser_acces()</code></pre>""",
    "points_cles": [
      "AND : vrai si les deux vrais | OR : vrai si au moins un vrai | NOT : inverse",
      "XOR : vrai si exactement un vrai (base du chiffrement)",
      "De Morgan : ¬(A∧B) = ¬A∨¬B et ¬(A∨B) = ¬A∧¬B",
      "Ensembles : union ∪, intersection ∩, complémentaire — utilisés pour droits AD",
      "Python : and / or / not correspondent à ∧ / ∨ / ¬"
    ],
    "liens": []
  },
  {
    "id": "math-06",
    "titre": "Réseaux et graphes",
    "contenu": """<h3>1. Définitions fondamentales</h3>
<ul>
  <li><strong>Graphe :</strong> ensemble de <em>sommets</em> (nœuds) reliés par des <em>arêtes</em> (liens)</li>
  <li><strong>Graphe orienté :</strong> arêtes avec direction (A → B ≠ B → A)</li>
  <li><strong>Graphe non orienté :</strong> arêtes sans direction (A — B)</li>
  <li><strong>Pondéré :</strong> chaque arête a un poids (coût, distance, latence)</li>
  <li><strong>Chemin :</strong> suite de sommets consécutifs</li>
  <li><strong>Degré :</strong> nombre d'arêtes connectées à un sommet</li>
</ul>

<h3>2. Matrice d'adjacence</h3>
<p>Pour un graphe de 4 nœuds A, B, C, D avec arêtes A-B(2), A-C(4), B-C(1), B-D(5), C-D(3) :</p>
<table>
  <tr><th></th><th>A</th><th>B</th><th>C</th><th>D</th></tr>
  <tr><td><strong>A</strong></td><td>0</td><td>2</td><td>4</td><td>∞</td></tr>
  <tr><td><strong>B</strong></td><td>2</td><td>0</td><td>1</td><td>5</td></tr>
  <tr><td><strong>C</strong></td><td>4</td><td>1</td><td>0</td><td>3</td></tr>
  <tr><td><strong>D</strong></td><td>∞</td><td>5</td><td>3</td><td>0</td></tr>
</table>

<h3>3. Algorithme de Dijkstra — Pas à pas</h3>
<p>Objectif : trouver le <strong>chemin le plus court</strong> depuis un sommet source.</p>
<p><strong>Réseau exemple :</strong> A-B=4, A-C=2, B-D=3, C-B=1, C-D=5</p>
<ol>
  <li>Initialiser : dist[A]=0, dist[B]=∞, dist[C]=∞, dist[D]=∞. Non visités = {A,B,C,D}</li>
  <li>Visiter A (dist=0) : mettre à jour B→4, C→2</li>
  <li>Visiter C (dist=2, le plus petit non visité) : B via C = 2+1=3 (mieux que 4), D via C = 2+5=7</li>
  <li>Visiter B (dist=3) : D via B = 3+3=6 (mieux que 7)</li>
  <li>Visiter D (dist=6) : terminé</li>
</ol>
<p><strong>Résultat :</strong> A→C→B→D (coût total = 6). Route optimale !</p>

<h3>4. Applications réseaux SISR</h3>
<ul>
  <li><strong>Protocoles de routage :</strong> OSPF, RIP utilisent des algorithmes de graphes</li>
  <li><strong>Spanning Tree Protocol (STP) :</strong> évite les boucles dans un graphe réseau</li>
  <li><strong>Analyse de topologie :</strong> points de défaillance unique (single point of failure)</li>
  <li><strong>CDN :</strong> plus court chemin vers le serveur le plus proche</li>
  <li><strong>BGP :</strong> routage inter-AS basé sur les graphes de chemins</li>
</ul>

<h3>5. Exercices résolus</h3>
<p><strong>Exercice 1 :</strong> Construire la matrice d'adjacence d'un réseau : R1-R2=1, R1-R3=3, R2-R3=2, R2-R4=4, R3-R4=1</p>
<p><em>Solution :</em> Matrice 4x4 symétrique avec les valeurs mentionnées et 0 sur la diagonale.</p>

<p><strong>Exercice 2 :</strong> Appliquer Dijkstra depuis R1 sur le réseau ci-dessus.</p>
<p><em>Solution :</em> dist[R1]=0, dist[R2]=1 (via R1), dist[R3]=3 (via R1, ou 3 via R1-R2-R3=3, égal), dist[R4]=4 (via R1-R2-R3-R4=4 ou R1-R2-R4=5). Optimal : R1→R2=1, R1→R2→R3=3, R1→R2→R3→R4=4</p>

<p><strong>Exercice 3 :</strong> Un réseau a 5 routeurs et chaque routeur est connecté à exactement 2 autres. Quel est le nombre total d'arêtes ?</p>
<p><em>Solution :</em> Somme des degrés = 5×2 = 10. Nombre d'arêtes = 10/2 = <strong>5 arêtes</strong></p>""",
    "points_cles": [
      "Graphe = sommets + arêtes (orienté ou non, pondéré ou non)",
      "Matrice d'adjacence : ligne i, colonne j = poids arête i→j (∞ si pas de lien)",
      "Dijkstra : chemin le plus court, greedy algorithm, base d'OSPF",
      "STP = Spanning Tree Protocol évite les boucles (graphe sans cycle)",
      "Degré d'un sommet = nombre d'arêtes connectées"
    ],
    "liens": []
  }
]

path_backend = r'C:\Users\nedjb\Documents\PROJET IT\bts-revision\backend\data\cours_maths.json'
path_frontend = r'C:\Users\nedjb\Documents\PROJET IT\bts-revision\frontend\data\cours_maths.json'

for path in [path_backend, path_frontend]:
    with open(path, 'w', encoding='utf-8', newline='') as f:
        f.write(json.dumps(data, ensure_ascii=False, indent=2))
    print(f"Written: {path}")

print(f"Chapters: {len(data)}")
