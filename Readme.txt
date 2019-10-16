MYP2.0

PORTFOLIO

Projects - Root Node : object (kind of an array) [1....n]
    $projectName - level 0 Node : Object (1) { Data, Images }
        Data        - level 0.1 (L-Sibling) Node : Object (1) { name, desc, link }
        Images      - level 0.1 (R-Sibling) Node : Object (kind of an array) [1....n]
            Image$number : Image Hash { key : value }



ABOUT

Information - Root Node : Object (1) { Personal_Details, Contact_Details }
    Personal_Details    - level 0 (L-Sibling) Node : object (1) { name, designation, about, image }
    Contact_Details     - level 0 (R-Sibling) Node : Object (1) { Social_Details, Other_Details }
        Social_Details      - level 0.1 (L-Sibling) Node : object (kind of an array) [1....n]
            $platformName       : #url {key : value }
        Other Details       - level 0.1 (R-Sibling) Node : object (1) { email, mobile, otherLink }


ACHEIVEMENTS

Conquest - Root Node : Object (1) { Skills, Certificates }
    Skills          - level 0 (L-Sibling) Node : object (kind of like array) [1....n]
        $skillName      : Options = Beginner | Intermediate | Advance { key : value }
    Certificates    - level 0 (R-Sibling) Node : object (kind of like array) [1....n]
        Cert$number     : level 0.1 Node : Object (1) { image, description }

