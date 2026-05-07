import json

data = [
  {
    "id": "cejm-01",
    "titre": "L'entreprise et son environnement",
    "contenu": """<h3>1. Définition et objectifs de l'entreprise</h3>
<p>Une <strong>entreprise</strong> est une unité économique qui combine des facteurs de production (capital, travail, technologie) pour produire des biens ou services en vue de réaliser un profit ou d'atteindre un objectif social.</p>
<ul>
  <li><strong>Objectif économique :</strong> rentabilité, croissance, part de marché</li>
  <li><strong>Objectif social :</strong> emploi, RSE, bien-être des salariés</li>
  <li><strong>Objectif stratégique :</strong> innovation, pérennité, compétitivité</li>
</ul>

<h3>2. Les parties prenantes (Stakeholders)</h3>
<p>Toute personne ou groupe impacté par l'entreprise ou qui peut l'impacter.</p>
<table>
  <tr><th>Internes</th><th>Externes</th></tr>
  <tr><td>Dirigeants, actionnaires</td><td>Clients, fournisseurs</td></tr>
  <tr><td>Salariés, syndicats</td><td>Banques, investisseurs</td></tr>
  <tr><td>Managers, DRH</td><td>État, collectivités</td></tr>
  <tr><td>DSI, service IT</td><td>Concurrents, médias</td></tr>
</table>

<h3>3. Analyse PESTEL</h3>
<p>Outil d'analyse macro-environnementale pour identifier les facteurs externes.</p>
<ul>
  <li><strong>P</strong>olitique : stabilité gouvernementale, politique fiscale, régulation IT</li>
  <li><strong>É</strong>conomique : taux de croissance, inflation, pouvoir d'achat</li>
  <li><strong>S</strong>ocial : démographie, niveau d'éducation, télétravail</li>
  <li><strong>T</strong>echnologique : IA, cloud, cybersécurité, IoT</li>
  <li><strong>É</strong>cologique : bilan carbone, green IT, data centers verts</li>
  <li><strong>L</strong>égal : RGPD, NIS2, droit du travail, propriété intellectuelle</li>
</ul>
<p><strong>Exemple Ragni :</strong> fabricant électrique. T → numérisation de la production. L → conformité directive basse tension. É → inflation des matières premières.</p>

<h3>4. Analyse SWOT</h3>
<table>
  <tr><th>Forces (internes +)</th><th>Faiblesses (internes -)</th></tr>
  <tr><td>Expertise technique, R&D, marque</td><td>Coûts élevés, dette technique</td></tr>
  <tr><th>Opportunités (externes +)</th><th>Menaces (externes -)</th></tr>
  <tr><td>Nouveaux marchés, cloud, IA</td><td>Concurrence, cybermenaces, régulation</td></tr>
</table>
<p><strong>Exemple DSI :</strong> Force = infrastructure solide. Faiblesse = manque de compétences cloud. Opportunité = migration Azure. Menace = ransomwares.</p>

<h3>5. Cas pratiques</h3>
<p><strong>Cas 1 :</strong> Une PME veut adopter le cloud. Analysez avec SWOT.</p>
<p><em>Réponse :</em> Force = réduction coûts infra. Faiblesse = compétences internes limitées. Opportunité = SaaS disponibles. Menace = dépendance fournisseur (vendor lock-in).</p>
<p><strong>Cas 2 :</strong> Citez 3 facteurs PESTEL impactant une ESN en 2024.</p>
<p><em>Réponse :</em> T = IA générative (ChatGPT concurrence les développeurs juniors). L = NIS2 crée des besoins en cybersécurité. S = pénurie de talents IT.</p>""",
    "points_cles": [
      "PESTEL : Politique, Économique, Social, Technologique, Écologique, Légal",
      "SWOT : Forces/Faiblesses (internes) + Opportunités/Menaces (externes)",
      "Parties prenantes internes : dirigeants, salariés | externes : clients, État",
      "Entreprise IT : NIS2, RGPD, IA, cloud comme facteurs PESTEL clés",
      "Analyse SWOT précède toute décision stratégique (cloud, externalisation)"
    ],
    "liens": []
  },
  {
    "id": "cejm-02",
    "titre": "Le droit des contrats",
    "contenu": """<h3>1. Formation du contrat</h3>
<p>Un contrat est un <strong>accord de volontés entre au moins deux parties</strong> créant des obligations juridiques.</p>
<p>Formation en 2 étapes :</p>
<ol>
  <li><strong>Offre :</strong> proposition ferme, précise et destinée à une ou plusieurs personnes</li>
  <li><strong>Acceptation :</strong> accord pur et simple de l'offre (pas de contre-proposition)</li>
</ol>
<p><em>Exemple IT :</em> Un prestataire propose un devis pour une infogérance (offre) → le client signe le bon de commande (acceptation) → contrat formé.</p>

<h3>2. Conditions de validité (art. 1128 Code civil)</h3>
<ul>
  <li><strong>Consentement éclairé :</strong> libre, non vicié, exprès ou tacite</li>
  <li><strong>Capacité juridique :</strong> être majeur et ne pas être sous tutelle</li>
  <li><strong>Objet licite :</strong> ce qui est promis est légal et possible</li>
  <li><strong>Cause licite :</strong> raison du contrat conforme à l'ordre public</li>
</ul>

<h3>3. Vices du consentement</h3>
<table>
  <tr><th>Vice</th><th>Définition</th><th>Exemple IT</th></tr>
  <tr><td><strong>Erreur</strong></td><td>Croyance fausse sur un élément essentiel</td><td>Confondre cloud public et privé dans le contrat</td></tr>
  <tr><td><strong>Dol</strong></td><td>Manœuvres frauduleuses pour tromper</td><td>Prestataire exagère les performances de sa solution</td></tr>
  <tr><td><strong>Violence</strong></td><td>Contrainte physique ou morale</td><td>Rare en IT, mais possible (chantage données)</td></tr>
</table>
<p>Un vice entraîne la <strong>nullité relative</strong> du contrat.</p>

<h3>4. Exécution et inexécution</h3>
<ul>
  <li><strong>Exécution de bonne foi :</strong> obligation légale (art. 1104 CC)</li>
  <li><strong>SLA (Service Level Agreement) :</strong> contrat de niveau de service IT</li>
  <li><strong>Inexécution :</strong> peut entraîner résolution du contrat + dommages-intérêts</li>
  <li><strong>Force majeure :</strong> exonère si événement imprévisible, irrésistible, extérieur</li>
</ul>
<p><em>Exemple :</em> Un hébergeur garantit 99,9% de disponibilité (SLA). Panne de 2h → inexécution → pénalités contractuelles.</p>

<h3>5. Contrats spécifiques au numérique</h3>
<ul>
  <li><strong>Contrat de maintenance :</strong> curative (pannes), préventive, évolutive</li>
  <li><strong>Contrat de licence logicielle :</strong> droit d'utilisation (EULA)</li>
  <li><strong>Contrat cloud (SaaS/IaaS) :</strong> inclut RGPD, localisation données, reversibilité</li>
  <li><strong>NDA (Non-Disclosure Agreement) :</strong> confidentialité des données techniques</li>
</ul>

<h3>6. Cas pratiques</h3>
<p><strong>Cas 1 :</strong> Un client commande un logiciel de gestion en croyant qu'il inclut la formation. Ce n'est pas dans le contrat. Quel vice ?</p>
<p><em>Réponse :</em> <strong>Erreur sur l'objet</strong> → nullité relative possible si erreur substantielle.</p>
<p><strong>Cas 2 :</strong> Un prestataire IT promet une migration en 2 semaines mais sait que c'est impossible. Quel vice ?</p>
<p><em>Réponse :</em> <strong>Dol</strong> → manœuvre frauduleuse → contrat annulable + dommages.</p>""",
    "points_cles": [
      "Contrat = offre + acceptation | 4 conditions : consentement, capacité, objet licite, cause licite",
      "3 vices du consentement : erreur, dol (tromperie), violence",
      "SLA = contrat de niveau de service | inexécution → pénalités",
      "Contrat cloud DOIT mentionner : localisation données, RGPD, réversibilité",
      "Force majeure : exonère si imprévisible + irrésistible + extérieur"
    ],
    "liens": []
  },
  {
    "id": "cejm-03",
    "titre": "Le droit du travail",
    "contenu": """<h3>1. Les types de contrats de travail</h3>
<table>
  <tr><th>Type</th><th>Durée</th><th>Usage</th><th>Particularités</th></tr>
  <tr><td><strong>CDI</strong></td><td>Indéterminée</td><td>Poste permanent</td><td>Contrat de droit commun</td></tr>
  <tr><td><strong>CDD</strong></td><td>Déterminée (max 18 mois)</td><td>Accroissement activité, remplacement</td><td>Renouvellement limité</td></tr>
  <tr><td><strong>Alternance</strong></td><td>1 à 3 ans</td><td>Formation diplômante (BTS !) </td><td>Apprentissage ou contrat pro</td></tr>
  <tr><td><strong>Stage</strong></td><td>Max 6 mois</td><td>Convention de stage</td><td>Pas un contrat de travail</td></tr>
</table>
<p><strong>BTS en alternance :</strong> contrat d'apprentissage = CFA + entreprise. Statut d'apprenti, salaire = % SMIC selon âge.</p>

<h3>2. Conditions de validité d'un contrat de travail</h3>
<ul>
  <li>Consentement libre et éclairé des deux parties</li>
  <li>Capacité juridique (mineur avec autorisation parentale)</li>
  <li>Objet licite (travail légal)</li>
  <li><strong>Éléments essentiels :</strong> identité parties, poste, rémunération, durée du travail, lieu</li>
</ul>

<h3>3. Droits et obligations</h3>
<table>
  <tr><th>Employeur</th><th>Salarié</th></tr>
  <tr><td>Verser le salaire</td><td>Exécuter le travail demandé</td></tr>
  <tr><td>Fournir les équipements</td><td>Respecter les horaires</td></tr>
  <tr><td>Assurer la sécurité</td><td>Respecter la confidentialité</td></tr>
  <tr><td>Respecter le droit du travail</td><td>Respecter le règlement intérieur</td></tr>
  <tr><td>Former les salariés</td><td>Loyauté envers l'employeur</td></tr>
</table>

<h3>4. Rupture du contrat de travail</h3>
<ul>
  <li><strong>Démission :</strong> à l'initiative du salarié, préavis obligatoire, pas de chômage (sauf démission légitime)</li>
  <li><strong>Licenciement économique :</strong> suppression poste, motif économique</li>
  <li><strong>Licenciement disciplinaire :</strong> faute simple, grave, lourde (gravité croissante)</li>
  <li><strong>Rupture conventionnelle :</strong> accord mutuel, homologuée par la DREETS, droits au chômage</li>
  <li><strong>Faute grave :</strong> pas d'indemnité de licenciement ni de préavis</li>
  <li><strong>Faute lourde :</strong> intention de nuire, pas d'indemnités + prise en charge dommages</li>
</ul>

<h3>5. RGPD en entreprise IT</h3>
<ul>
  <li><strong>DPO (Data Protection Officer) :</strong> obligatoire pour organismes traitant données sensibles</li>
  <li><strong>Droits des salariés :</strong> accès, rectification, effacement des données personnelles</li>
  <li><strong>Surveillance des salariés :</strong> légale si proportionnée et déclarée (CNIL)</li>
  <li><strong>Charte informatique :</strong> document opposable, usage des ressources IT</li>
  <li><strong>Violation RGPD :</strong> jusqu'à 4% du CA mondial ou 20 M€</li>
</ul>

<h3>6. Cas pratique</h3>
<p><strong>Cas :</strong> Un technicien IT copie des données clients sur une clé USB personnelle. Quelle sanction ?</p>
<p><em>Réponse :</em> Violation de la clause de confidentialité + possible violation RGPD → licenciement pour faute grave (voire lourde si intention de nuire) + signalement CNIL si données personnelles.</p>""",
    "points_cles": [
      "CDI = contrat de droit commun | CDD = max 18 mois | Alternance = BTS apprentissage",
      "Rupture : démission (salarié), licenciement (employeur), rupture conventionnelle (mutuel)",
      "Faute grave : pas d'indemnités | Faute lourde : intention de nuire",
      "RGPD en entreprise : DPO obligatoire, charte informatique, droits des salariés",
      "BTS alternance = statut apprenti, salaire indexé sur le SMIC"
    ],
    "liens": []
  },
  {
    "id": "cejm-04",
    "titre": "L'économie numérique et la transformation digitale",
    "contenu": """<h3>1. L'économie de la donnée</h3>
<p>La donnée est devenue le <strong>principal actif stratégique</strong> des entreprises numériques.</p>
<ul>
  <li><strong>Data economy :</strong> valorisation commerciale des données (publicité ciblée, vente datasets)</li>
  <li><strong>Big Data :</strong> Volume, Vélocité, Variété, Véracité, Valeur (5V)</li>
  <li><strong>Monétisation :</strong> Google, Facebook = modèle publicitaire basé sur les données</li>
  <li><strong>GAFAM :</strong> domination par les données → enjeux réglementaires (DSA, DMA)</li>
</ul>

<h3>2. Business models numériques</h3>
<table>
  <tr><th>Modèle</th><th>Description</th><th>Exemple</th></tr>
  <tr><td><strong>SaaS</strong></td><td>Logiciel comme service, abonnement mensuel</td><td>Microsoft 365, Salesforce</td></tr>
  <tr><td><strong>Marketplace</strong></td><td>Plateforme mettant en relation vendeurs/acheteurs</td><td>Amazon, Leboncoin</td></tr>
  <tr><td><strong>Freemium</strong></td><td>Version gratuite + premium payante</td><td>Spotify, Dropbox</td></tr>
  <tr><td><strong>Abonnement</strong></td><td>Paiement récurrent pour accès</td><td>Netflix, GitHub Pro</td></tr>
  <tr><td><strong>API Economy</strong></td><td>Monétisation d'API (paiement à l'appel)</td><td>Stripe, Twilio, OpenAI</td></tr>
</table>

<h3>3. Impact du numérique sur les entreprises</h3>
<ul>
  <li><strong>Disruption :</strong> Uber vs taxis, Airbnb vs hôtels, Stripe vs banques</li>
  <li><strong>Omnicanal :</strong> expérience client unifiée web/mobile/physique</li>
  <li><strong>Automatisation :</strong> RPA (Robotic Process Automation) remplace tâches répétitives</li>
  <li><strong>Cloud-first :</strong> migration vers AWS, Azure, GCP → réduction CAPEX, augmentation OPEX</li>
  <li><strong>Agilité :</strong> DevOps, CI/CD → livraison continue</li>
</ul>

<h3>4. Cybersécurité comme enjeu économique</h3>
<ul>
  <li><strong>Coût moyen d'une cyberattaque :</strong> 4,45 M$ en 2023 (IBM Cost of Data Breach)</li>
  <li><strong>Ransomware :</strong> coût = rançon + arrêt d'activité + réputation</li>
  <li><strong>Assurance cyber :</strong> marché en forte croissance</li>
  <li><strong>NIS2 :</strong> directive européenne obligeant les entreprises critiques à se protéger</li>
  <li><strong>ROI sécurité :</strong> 1€ investi en prévention = économie de 7€ en gestion crise</li>
</ul>

<h3>5. Intelligence artificielle et emploi</h3>
<ul>
  <li><strong>Emplois menacés :</strong> tâches répétitives (saisie, comptabilité basique, support N1)</li>
  <li><strong>Nouveaux métiers :</strong> prompt engineer, MLOps, AI ethicist, data scientist</li>
  <li><strong>Augmentation :</strong> IA comme outil d'aide (Copilot, ChatGPT) pas remplacement total</li>
  <li><strong>Impact SISR :</strong> AIOps (supervision automatisée), sécurité IA (SIEM+ML)</li>
</ul>

<h3>6. Cas pratique</h3>
<p><strong>Cas :</strong> Une PME veut passer son ERP en SaaS. Analysez les avantages et risques.</p>
<p><em>Réponse :</em> Avantages : pas de serveur à maintenir, mises à jour auto, accessibilité. Risques : dépendance fournisseur, localisation données (RGPD), disponibilité réseau, coût long terme plus élevé.</p>""",
    "points_cles": [
      "SaaS = logiciel par abonnement | Freemium = gratuit + payant | Marketplace = plateforme",
      "Big Data : 5V — Volume, Vélocité, Variété, Véracité, Valeur",
      "Coût moyen cyberattaque : 4,45 M$ → cybersécurité = enjeu économique majeur",
      "NIS2 : directive obligeant secteurs critiques à renforcer leur sécurité",
      "IA : détruit emplois répétitifs, crée emplois data/ML/AI"
    ],
    "liens": []
  },
  {
    "id": "cejm-05",
    "titre": "Le management et les organisations",
    "contenu": """<h3>1. Styles de management</h3>
<table>
  <tr><th>Style</th><th>Caractéristique</th><th>Quand l'utiliser</th></tr>
  <tr><td><strong>Autoritaire</strong></td><td>Décide seul, ordres directs</td><td>Urgence, crise</td></tr>
  <tr><td><strong>Persuasif</strong></td><td>Décide mais explique et convainc</td><td>Équipe peu expérimentée</td></tr>
  <tr><td><strong>Participatif</strong></td><td>Consulte l'équipe avant de décider</td><td>Équipe experte, projets complexes</td></tr>
  <tr><td><strong>Délégatif</strong></td><td>Délègue les décisions à l'équipe</td><td>Équipe très compétente et autonome</td></tr>
</table>
<p>Grille de Blake & Mouton : axe orientation tâche vs orientation personnes.</p>

<h3>2. Structures organisationnelles</h3>
<ul>
  <li><strong>Hiérarchique (ligne) :</strong> chaîne de commandement claire, rigide, adaptée PME</li>
  <li><strong>Fonctionnelle :</strong> spécialisation par domaine (IT, RH, Finance)</li>
  <li><strong>Divisionnelle :</strong> par produit/marché/zone géographique</li>
  <li><strong>Matricielle :</strong> double hiérarchie fonctionnel + projet (adapté ESN)</li>
  <li><strong>Réseau/Agile :</strong> cellules autonomes, structure plate (startup, DevOps)</li>
</ul>

<h3>3. Gestion de projet</h3>
<p><strong>Méthode classique (Waterfall) :</strong></p>
<ul>
  <li>Phases : Analyse → Conception → Réalisation → Tests → Déploiement → Maintenance</li>
  <li>Outils : Diagramme de Gantt (tâches/temps), PERT (dépendances)</li>
</ul>
<p><strong>Méthode Agile/Scrum :</strong></p>
<ul>
  <li><strong>Sprint :</strong> itération de 2 semaines avec livraison</li>
  <li><strong>Product Backlog :</strong> liste priorisée des fonctionnalités</li>
  <li><strong>Daily Scrum :</strong> réunion quotidienne 15 min (quoi hier, quoi aujourd'hui, blocages)</li>
  <li><strong>Rôles :</strong> Product Owner, Scrum Master, Dev Team</li>
</ul>
<p><strong>Indicateurs projet :</strong> délai, coût, qualité (triangle d'or).</p>

<h3>4. Communication en entreprise</h3>
<ul>
  <li><strong>Ascendante :</strong> salarié → management (retours, alertes)</li>
  <li><strong>Descendante :</strong> management → équipe (directives, objectifs)</li>
  <li><strong>Horizontale :</strong> entre collègues de même niveau</li>
  <li><strong>Outils IT :</strong> Teams, Slack, email, wiki interne, ticketing (Jira)</li>
</ul>

<h3>5. Prise de décision</h3>
<ul>
  <li><strong>Décision stratégique :</strong> long terme, dirigeants (ex : cloud migration)</li>
  <li><strong>Décision tactique :</strong> moyen terme, managers (ex : choix SIEM)</li>
  <li><strong>Décision opérationnelle :</strong> court terme, techniciens (ex : redémarrage serveur)</li>
  <li><strong>Rationalité limitée :</strong> H. Simon — on décide avec informations imparfaites</li>
</ul>""",
    "points_cles": [
      "4 styles management : autoritaire, persuasif, participatif, délégatif",
      "Scrum : sprint 2 semaines, daily 15 min, Product Owner + Scrum Master",
      "Structure matricielle : adapté aux ESN (chef projet + chef fonctionnel)",
      "Triangle d'or projet : délai, coût, qualité — impossible d'optimiser les 3 simultanément",
      "Communication descendante (directives) vs ascendante (remontées terrain)"
    ],
    "liens": []
  },
  {
    "id": "cejm-06",
    "titre": "La mondialisation et les échanges internationaux",
    "contenu": """<h3>1. Le commerce international</h3>
<ul>
  <li><strong>Importation :</strong> achat de biens/services à l'étranger</li>
  <li><strong>Exportation :</strong> vente de biens/services vers l'étranger</li>
  <li><strong>Balance commerciale :</strong> exports − imports (excédent si positif, déficit si négatif)</li>
  <li><strong>Balance des paiements :</strong> inclut aussi les services, transferts, capitaux</li>
</ul>
<p><strong>France 2023 :</strong> déficit commercial d'environ 100 Md€ (imports énergie, industrie)</p>

<h3>2. Organisations internationales</h3>
<table>
  <tr><th>Organisation</th><th>Rôle</th><th>Impact IT</th></tr>
  <tr><td><strong>OMC</strong></td><td>Régule le commerce mondial, règle les litiges</td><td>Accords sur services numériques</td></tr>
  <tr><td><strong>FMI</strong></td><td>Stabilité financière mondiale, prêts aux pays</td><td>Financement infra numériques pays émergents</td></tr>
  <tr><td><strong>Banque Mondiale</strong></td><td>Développement économique, réduction pauvreté</td><td>Financement transition numérique pays pauvres</td></tr>
  <tr><td><strong>UE</strong></td><td>Marché unique, libre circulation</td><td>RGPD, DSA, DMA, Cyber Resilience Act</td></tr>
  <tr><td><strong>G7/G20</strong></td><td>Coordination politiques économiques</td><td>Taxation GAFAM (taxe OCDE 15%)</td></tr>
</table>

<h3>3. La théorie des avantages comparatifs (Ricardo)</h3>
<p>Un pays se spécialise dans ce qu'il produit <strong>relativement moins cher</strong> que les autres.</p>
<p><em>Exemple :</em> Inde → développement logiciel (coûts bas). France → conception, architecture, sécurité (valeur ajoutée). → Les deux ont intérêt à coopérer.</p>
<ul>
  <li><strong>Conséquence IT :</strong> offshore/nearshore pour développement bas de gamme</li>
  <li><strong>Limite :</strong> dumping social, risques RGPD, qualité variable</li>
</ul>

<h3>4. Impact de la mondialisation sur les emplois IT</h3>
<ul>
  <li><strong>Délocalisation :</strong> support N1/N2, développement offshore (Inde, Maroc)</li>
  <li><strong>Nearshore :</strong> Europe de l'Est (Roumanie, Ukraine) pour proximité culturelle</li>
  <li><strong>Onshore :</strong> maintien local pour raisons de sécurité (données souveraines)</li>
  <li><strong>Cloud souverain :</strong> OVHcloud, Docaposte pour données sensibles françaises</li>
  <li><strong>Nouveaux emplois :</strong> architectes cloud, experts RGPD, pentesters — non délocalisables</li>
</ul>

<h3>5. Exemple concret : Groupe Ragni</h3>
<p>Ragni = groupe français spécialisé dans la signalisation lumineuse et l'éclairage public.</p>
<ul>
  <li><strong>Mondialisation :</strong> exportations en Europe, Moyen-Orient, Afrique</li>
  <li><strong>SI :</strong> ERP centralisé, gestion des filiales internationales</li>
  <li><strong>PESTEL :</strong> réglementation EU sur l'éclairage LED (directive éco-conception)</li>
  <li><strong>Impact numérique :</strong> smartcity, IoT dans les lampadaires connectés</li>
</ul>

<h3>6. Cas pratique</h3>
<p><strong>Cas :</strong> Une ESN veut externaliser son support technique en Inde. Quels sont les enjeux ?</p>
<p><em>Réponse :</em> Avantages (Ricardo) : coûts réduits. Risques : RGPD (données hors UE), qualité, décalage horaire, dépendance. Solution : contrat DPA, anonymisation données, supervision qualité.</p>""",
    "points_cles": [
      "Balance commerciale = exports - imports (déficit France ~100 Md€/an)",
      "Ricardo : avantages comparatifs → spécialisation internationale",
      "UE = RGPD, DSA, DMA : cadre réglementaire numérique le plus strict au monde",
      "Cloud souverain : OVHcloud, Docaposte pour données sensibles françaises",
      "Offshore IT : Inde (développement) mais contraintes RGPD pour données EU"
    ],
    "liens": []
  },
  {
    "id": "cejm-07",
    "titre": "Les structures juridiques de l'entreprise",
    "contenu": """<h3>1. Formes juridiques principales</h3>
<table>
  <tr><th>Forme</th><th>Responsabilité</th><th>Capital</th><th>Associés</th></tr>
  <tr><td>Auto-entrepreneur</td><td>Illimitée</td><td>Aucun</td><td>1</td></tr>
  <tr><td>EURL</td><td>Limitée</td><td>1 €</td><td>1</td></tr>
  <tr><td>SARL</td><td>Limitée</td><td>1 €</td><td>2 à 100</td></tr>
  <tr><td>SAS/SASU</td><td>Limitée</td><td>Libre</td><td>1+</td></tr>
  <tr><td>SA</td><td>Limitée</td><td>37 000 €</td><td>7 min.</td></tr>
</table>
<p><strong>ESN courantes :</strong> SAS (flexibilité), SARL (PME familiales), SA (cotées)</p>

<h3>2. Critères de choix</h3>
<ul>
  <li><strong>Responsabilité :</strong> illimitée (risque perso) vs limitée (protection patrimoine)</li>
  <li><strong>Fiscalité :</strong> IS (Impôt Sociétés) ou IR (Impôt Revenu)</li>
  <li><strong>Gouvernance :</strong> dirigeant unique ou conseil d'administration</li>
  <li><strong>Financement :</strong> SA/SAS pour levée de fonds (actions)</li>
</ul>""",
    "points_cles": [
      "SARL : 2-100 associés, responsabilité limitée, capital 1€",
      "SAS : très flexible, privilégié par les startups IT",
      "SA : 7 associés min, 37 000€ capital, pour grandes entreprises cotées",
      "Auto-entrepreneur : simple mais responsabilité illimitée"
    ],
    "liens": []
  },
  {
    "id": "cejm-08",
    "titre": "La transformation numérique",
    "contenu": """<h3>1. Définition et enjeux</h3>
<p>La transformation numérique (Digital Transformation) est l'intégration des technologies digitales dans tous les aspects d'une entreprise, changeant fondamentalement son fonctionnement.</p>
<ul>
  <li><strong>Cloud :</strong> migration infra vers AWS/Azure/GCP</li>
  <li><strong>Data :</strong> analytics, BI, décision data-driven</li>
  <li><strong>IA :</strong> automatisation, prédiction, NLP</li>
  <li><strong>IoT :</strong> objets connectés, industrie 4.0</li>
  <li><strong>Cyber :</strong> zero trust, SASE</li>
</ul>

<h3>2. Modèles de cloud computing</h3>
<table>
  <tr><th>Modèle</th><th>Gestion client</th><th>Exemple</th></tr>
  <tr><td>IaaS</td><td>OS, applis, données</td><td>AWS EC2, Azure VM</td></tr>
  <tr><td>PaaS</td><td>Applis, données</td><td>Heroku, Azure App Service</td></tr>
  <tr><td>SaaS</td><td>Données seulement</td><td>Salesforce, Office 365</td></tr>
</table>""",
    "points_cles": [
      "IaaS = infrastructure gérée | PaaS = plateforme | SaaS = logiciel",
      "Zero Trust : ne jamais faire confiance, toujours vérifier",
      "Cloud souverain obligatoire pour données régalières (santé, défense)"
    ],
    "liens": []
  },
  {
    "id": "cejm-09",
    "titre": "Le RGPD et le droit du numérique",
    "contenu": """<h3>1. Principes fondamentaux du RGPD</h3>
<ul>
  <li><strong>Licéité :</strong> traitement basé sur une base légale (consentement, contrat, obligation légale)</li>
  <li><strong>Minimisation :</strong> ne collecter que les données nécessaires</li>
  <li><strong>Exactitude :</strong> données à jour</li>
  <li><strong>Limitation :</strong> durée de conservation définie</li>
  <li><strong>Intégrité et confidentialité :</strong> sécurité technique et organisationnelle</li>
</ul>

<h3>2. Droits des personnes</h3>
<ul>
  <li>Droit d'accès, rectification, effacement (droit à l'oubli)</li>
  <li>Droit à la portabilité, opposition, limitation</li>
  <li>Délai de réponse : 1 mois</li>
</ul>

<h3>3. Obligations entreprise</h3>
<ul>
  <li>Registre des traitements</li>
  <li>DPO si nécessaire</li>
  <li>Notification violation sous 72h à la CNIL</li>
  <li>Analyse d'impact (DPIA) pour traitements à risque</li>
</ul>
<p><strong>Sanctions :</strong> jusqu'à 4% du CA mondial ou 20 millions €</p>""",
    "points_cles": [
      "RGPD : 6 principes clés dont minimisation et limitation de conservation",
      "Droits : accès, rectification, effacement, portabilité, opposition",
      "Violation de données → notification CNIL sous 72h",
      "Sanction max : 4% CA mondial ou 20 M€"
    ],
    "liens": []
  },
  {
    "id": "cejm-10",
    "titre": "Le marché et la concurrence",
    "contenu": """<h3>1. Structure des marchés</h3>
<table>
  <tr><th>Structure</th><th>Vendeurs</th><th>Acheteurs</th><th>Exemple IT</th></tr>
  <tr><td>Concurrence pure et parfaite</td><td>Nombreux</td><td>Nombreux</td><td>Hébergement web basique</td></tr>
  <tr><td>Oligopole</td><td>Peu</td><td>Nombreux</td><td>Cloud (AWS/Azure/GCP)</td></tr>
  <tr><td>Monopole</td><td>1</td><td>Nombreux</td><td>Windows OS (quasi-monopole)</td></tr>
  <tr><td>Monopsone</td><td>Nombreux</td><td>1</td><td>État pour marchés publics IT</td></tr>
</table>

<h3>2. Concurrence dans l'IT</h3>
<ul>
  <li><strong>Barrières à l'entrée :</strong> brevets, coûts R&D, effets réseau</li>
  <li><strong>Effets réseau :</strong> plateforme plus utile quand plus d'utilisateurs (WhatsApp, Teams)</li>
  <li><strong>Lock-in :</strong> dépendance technologique (Azure AD, Google Workspace)</li>
  <li><strong>Disruption :</strong> nouvel entrant casse le marché (Dropbox vs serveurs, Zoom vs téléphonie)</li>
</ul>

<h3>3. Droit de la concurrence</h3>
<ul>
  <li><strong>Entente illicite :</strong> accord entre concurrents pour fixer les prix → interdit</li>
  <li><strong>Abus de position dominante :</strong> Amazon, Google sanctionnés par l'UE</li>
  <li><strong>Autorité de la concurrence :</strong> ADLC (France), DG COMP (UE)</li>
</ul>""",
    "points_cles": [
      "Oligopole cloud : AWS/Azure/GCP = 3 acteurs dominants",
      "Effets réseau : valeur croît avec le nombre d'utilisateurs",
      "Lock-in technologique : risque majeur dans les choix IT",
      "Abus position dominante : Google/Amazon régulièrement sanctionnés par l'UE"
    ],
    "liens": []
  }
]

path_backend = r'C:\Users\nedjb\Documents\PROJET IT\bts-revision\backend\data\cours_cejm.json'
path_frontend = r'C:\Users\nedjb\Documents\PROJET IT\bts-revision\frontend\data\cours_cejm.json'

for path in [path_backend, path_frontend]:
    with open(path, 'w', encoding='utf-8', newline='') as f:
        f.write(json.dumps(data, ensure_ascii=False, indent=2))
    print(f"Written: {path}")

print(f"Chapters: {len(data)}")
