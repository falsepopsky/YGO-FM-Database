## Yu-Gi-Oh! Forbidden Memories Database

Version: 1.0

Forked from [GitHub Repository](https://github.com/Solumin/YGO-FM-FusionCalc) created by [Solumin](https://github.com/Solumin). Due to Inactive maintenance, I decided to added some style, and make it more great !.

**How to Use the Database**

Visit the Yu-Gi-Oh! Forbidden Memories Database on [GitHub
Pages](https://falsepopsky.github.io/YGO-FM-Database/) and then you can swap from search cards from the database or input your hand and discover what type of fusion you can do.

### Contributing

Feel free to fork and send pull requests.

### Project Notes

All data for the project is in the `data` directory, and it is all derived from
`Cards.json` into a series of lists, using `scripts/make_databases.rb`.

-   `cards.js` loads `Cards.json` into a [TaffyDB](http://www.taffydb.com/)
    instance
-   `fusions.js` loads the list of fusions for each card into a list.
-   `equips.js` loads the list of equips for each card into a list. If the card
    can _equip_ items, its entry is the list of Equip-type cards that it can be
    used with. If the card is an _Equip-type_ card, its entry is the list of cards
    it can be equipped onto.
-   `results.js` loads the list of fusions for each card that the card is the
    result of.
-   `types_and_stars.js` has two lists that map indexes to the card types (Beast,
    Spellcaster, Dragon, etc.) and to star names. (Neptune, Moon, etc.)

## Special Thanks:

-   [Solumin](https://github.com/Solumin) Original Author
-   Steve Kalynuik, Dylan Birtolo and Miguel Balauag, for the [Fusion
    FAQ](https://www.gamefaqs.com/ps/561010-yu-gi-oh-forbidden-memories/faqs/16613), an invaluable resource
-   The Yu-Gi-Oh! Wikia, for the list of cards that I turned into the card
    database
-   [CathodeRaymond](https://github.com/CathodeRaymond) for work with CSS and making the project actually look good
-   [duke1102](https://github.com/duke1102) for providing `Cards.json`, without which this project would be
    _very_ innacurate.
-   marcos0000 for Forbidden Memories Logo in HD [devianart profile](https://www.deviantart.com/marcos0000) and Carlos123321 for vrains background [devianart profile](https://www.deviantart.com/carlos123321)
-   Giver336 for the .gif
