const PostList = {
    posts: [],
    loadPosts: () => {
        fetch('https://api.digitalvalue.es/quartdepoblet/collections/articulos?nodeTypes=Actividades&limit=100&fields=_id,title,body,headerImage,tipo,categories&expand=true')
            .then(response => response.json())
            .then(data => {
                PostList.posts = data.items;

                m.redraw(); // Forcing Mithril to update the view
            })
            .catch(error => console.error('Error fetching posts:', error));
    },
    // view: () => {
    //     return m('div', [
    //         m('h2', 'Post List'),
    //         m('button', { onclick: PostList.loadPosts }, 'Load Posts'),
    //         m('ul', PostList.posts.map(post => m('li', post.title.und)))
    //     ]);
    // }
};
function NoHayResultados() {

    return {
        view: () => (
            m("div", { "class": "grid mt-10 px-4 bg-white place-content-center" },
                m("div", { "class": "text-center" },
                    [
                        m("img", { "src": "https://cdn.digitalvalue.es/quartdepoblet/assets2/64ddf565e72fae5a7cbda755" }),
                        m("h1", { "class": "mt-6 text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl" },
                            " Lo sentimos..."
                        ),
                        m("p", { "class": "mt-4 text-gray-500" },
                            "No hay resultados con los filtros seleccionados. Prueba con otros."
                        )
                    ]
                )
            )
        )
    }
}

function Spinner() {
    return {
        // oninit: ({ attrs }) => {
        //     const { close } = attrs
        //     setTimeout(() => {
        //         if (typeof close == 'function')
        //             close()
        //         m.redraw();
        //     }, 8000);
        // },
        view: ({ attrs }) => {
            // const { controller } = attrs
            // if (!controller) return
            return (
                m('div', m("div.flex.items-center.justify-center.mt-20",
                m("svg", { "class": "bi bi-arrow-repeat animate-spin", "xmlns": "http://www.w3.org/2000/svg", "width": "100", "height": "100", "fill": "currentColor", "viewBox": "0 0 16 16" },
                    [
                        m("path", { "d": "M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z" }),
                        m("path", { "fill-rule": "evenodd", "d": "M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z" })
                    ]
                )))
            )
        },
    };
}

const FilteredDataComponent = () => {

    PostList.loadPosts()

    return {

        tipoFilter: '',
        categoriaFilter: '',
        posts: [],
        loadPosts: () => {
            fetch('https://api.digitalvalue.es/quartdepoblet/collections/articulos?nodeTypes=Actividades&limit=100&fields=_id,title,body,headerImage,tipo,categories&expand=true')
                .then(response => response.json())
                .then(data => {
                    PostList.posts = data.items;

                })
                .catch(error => console.error('Error fetching posts:', error));

        },


        view: () => {

            const filteredData = PostList.posts.filter(item => {

                const tieneCategoria = item.categories.some(categorie => {

                    if (FilteredDataComponent.categoriaFilter && categorie !== FilteredDataComponent.categoriaFilter) {

                        return null;
                    }

                    return true;
                });

                const tieneTipo = item.tipo.some(tipo => {


                    if (FilteredDataComponent.tipoFilter && tipo !== FilteredDataComponent.tipoFilter) {

                        return null;
                    }

                    return true;
                });

                return tieneTipo && tieneCategoria


            });


            return m("div.max-w-6xl.px-4.py-10.sm:px-6.lg:px-8.lg:py-14.mx-auto",
                m("form",
                    m("div.bg-white.rounded-xl.shadow-xl.dark:bg-slate-900",
                        [

                            m("div.p-4.sm:p-7",
                                [
                                    m("div.space-y-4.sm:space-y-6",
                                        [


                                            m("div.space-y-2",
                                                [
                                                    m("div.max-w-2xl.text-center.mx-auto",
                                                        [
                                                            m("h1.block.text-3xl.font-bold.text-gray-800.sm:text-4xl.md:text-5xl.dark:text-white.titulo-cabecera",
                                                                [
                                                                    "Busca tu actividad",


                                                                ]
                                                            ),
                                                            m("p.mt-3.text-lg.text-gray-800.dark:text-gray-400",
                                                                "Encuentra las actividades eductivas que se realizan en tu zona"
                                                            )
                                                        ]
                                                    )

                                                ]
                                            ),
                                            m("div.space-y-2",
                                                [
                                                    m("label.inline-block.text-sm.font-medium.text-gray-800.mt-2.5.dark:text-gray-200[for='af-submit-app-category']",
                                                        " NIVELES EDUCATIVOS "
                                                    ),
                                                    m("select.cursor-pointer.py-2.px-3.pr-9.block.w-full.border-gray-200.shadow-sm.rounded-lg.text-sm.focus:border-blue-500.focus:ring-blue-500.dark:bg-slate-900.dark:border-gray-700.dark:text-gray-400[id='af-submit-app-category']", {
                                                        onchange: (e) => {
                                                            FilteredDataComponent.tipoFilter = e.target.value;
                                                        },
                                                    }, [
                                                        m('option', { value: '', selected: FilteredDataComponent.tipoFilter === '' }, 'TODOS LOS NIVELES'),
                                                        m('option', { value: '1 INFANTIL', selected: FilteredDataComponent.tipoFilter === '1 INFANTIL' }, '1 INFANTIL'),
                                                        m('option', { value: '2 INFANTIL', selected: FilteredDataComponent.tipoFilter === '2 INFANTIL' }, '2 INFANTIL'),
                                                        m('option', { value: '3 INFANTIL', selected: FilteredDataComponent.tipoFilter === '3 INFANTIL' }, '3 INFANTIL'),
                                                        m('option', { value: '1 PRIMARIA', selected: FilteredDataComponent.tipoFilter === '1 PRIMARIA' }, '1 PRIMARIA'),
                                                        m('option', { value: '2 PRIMARIA', selected: FilteredDataComponent.tipoFilter === '2 PRIMARIA' }, '2 PRIMARIA'),
                                                        m('option', { value: '3 PRIMARIA', selected: FilteredDataComponent.tipoFilter === '3 PRIMARIA' }, '3 PRIMARIA'),
                                                        m('option', { value: '4 PRIMARIA', selected: FilteredDataComponent.tipoFilter === '4 PRIMARIA' }, '4 PRIMARIA'),
                                                        m('option', { value: '5 PRIMARIA', selected: FilteredDataComponent.tipoFilter === '5 PRIMARIA' }, '5 PRIMARIA'),
                                                        m('option', { value: '6 PRIMARIA', selected: FilteredDataComponent.tipoFilter === '6 PRIMARIA' }, '6 PRIMARIA'),
                                                        m('option', { value: '1 ESO', selected: FilteredDataComponent.tipoFilter === '1 ESO' }, '1 ESO'),
                                                        m('option', { value: '2 ESO', selected: FilteredDataComponent.tipoFilter === '2 ESO' }, '2 ESO'),
                                                        m('option', { value: '3 ESO', selected: FilteredDataComponent.tipoFilter === '3 ESO' }, '3 ESO'),
                                                        m('option', { value: '4 ESO', selected: FilteredDataComponent.tipoFilter === '4 ESO' }, '4 ESO'),
                                                        m('option', { value: '1 FBP', selected: FilteredDataComponent.tipoFilter === '1 FBP' }, '1 FBP'),
                                                        m('option', { value: '2 FBP', selected: FilteredDataComponent.tipoFilter === '2 FBP' }, '2 FBP'),
                                                        m('option', { value: '1 BACHILLER', selected: FilteredDataComponent.tipoFilter === '1 BACHILLER' }, '1 BACHILLER'),
                                                        m('option', { value: '2 BACHILLER', selected: FilteredDataComponent.tipoFilter === '2 BACHILLER' }, '2 BACHILLER'),
                                                        m('option', { value: 'FP', selected: FilteredDataComponent.tipoFilter === 'FP' }, 'FP'),
                                                        m('option', { value: 'PROFESORADO', selected: FilteredDataComponent.tipoFilter === 'PROFESORADO' }, 'PROFESORADO'),
                                                    ]
                                                    ),

                                                ]
                                            ), m("div.space-y-2",
                                                [
                                                    m("label.inline-block.text-sm.font-medium.text-gray-800.mt-2.5.dark:text-gray-200[for='af-submit-app-category']",
                                                        " ÀMBITO TEMÁTICO "
                                                    ),
                                                    m("select.cursor-pointer.py-2.px-3.pr-9.block.w-full.border-gray-200.shadow-sm.rounded-lg.text-sm.focus:border-blue-500.focus:ring-blue-500.dark:bg-slate-900.dark:border-gray-700.dark:text-gray-400[id='af-submit-app-category']",
                                                        {
                                                            onchange: (e) => {
                                                                FilteredDataComponent.categoriaFilter = e.target.value;
                                                            },
                                                        }, [
                                                        m('option', { value: '', selected: FilteredDataComponent.categoriaFilter === '' }, 'TODOS LOS ÁMBITOS'),
                                                        m('option', { value: 'IGUALDAD', selected: FilteredDataComponent.categoriaFilter === 'IGUALDAD' }, 'IGUALDAD'),
                                                        m('option', { value: 'PROMOCION CULTURAL', selected: FilteredDataComponent.categoriaFilter === 'PROMOCION CULTURAL' }, 'PROMOCIÓN CULTURAL'),
                                                        m('option', { value: 'PROMOCION DE LA SALUD', selected: FilteredDataComponent.categoriaFilter === 'PROMOCION DE LA SALUD' }, 'PROMOCIÓN DE LA SALUD'),
                                                        m('option', { value: 'SEGURIDAD CIUDADANA', selected: FilteredDataComponent.categoriaFilter === 'SEGURIDAD CIUDADANA' }, 'SEGURIDAD CIUDADANA'),
                                                        m('option', { value: 'MEDIO AMBIENTE', selected: FilteredDataComponent.categoriaFilter === 'MEDIO AMBIENTE' }, 'MEDIO AMBIENTE'),
                                                        m('option', { value: 'PARTICIPACION', selected: FilteredDataComponent.categoriaFilter === 'PARTICIPACION' }, 'PARTICIPACIÓN'),
                                                        m('option', { value: 'EDUCACION INCLUSIVA', selected: FilteredDataComponent.categoriaFilter === 'EDUCACION INCLUSIVA' }, 'EDUCACIÓN INCLUSIVA'),
                                                        m('option', { value: 'CONOCE TU ENTORNO', selected: FilteredDataComponent.categoriaFilter === 'CONOCE TU ENTORNO' }, 'CONOCE TU ENTORNO'),
                                                        m('option', { value: 'SOLIDARIDAD', selected: FilteredDataComponent.categoriaFilter === 'SOLIDARIDAD' }, 'SOLIDARIDAD'),
                                                        m('option', { value: 'EDUCACION AFECTIVA', selected: FilteredDataComponent.categoriaFilter === 'EDUCACION AFECTIVA' }, 'EDUCACIÓN AFECTIVA'),
                                                        m('option', { value: 'INFANCIA', selected: FilteredDataComponent.categoriaFilter === 'INFANCIA' }, 'INFANCIA'),
                                                        m('option', { value: 'DIVULGACIÓN CIENTÍFICA', selected: FilteredDataComponent.categoriaFilter === 'DIVULGACION CIENTÍFICA' }, 'DIVULGACIÓN CIENTÍFICA'),
                                                        m('option', { value: 'VALORES', selected: FilteredDataComponent.categoriaFilter === 'VALORES' }, 'VALORES'),
                                                        m('option', { value: 'DERECHOS', selected: FilteredDataComponent.categoriaFilter === 'DERECHOS' }, 'DERECHOS'),
                                                        m('option', { value: 'EDUCACION AFECTIVA SEXUAL', selected: FilteredDataComponent.categoriaFilter === 'EDUCACION AFECTIVA SEXUAL' }, 'EDUCACIÓN AFECTIVA SEXUAL'),
                                                        m('option', { value: 'PARTICIPACION', selected: FilteredDataComponent.categoriaFilter === 'PARTICIPACION' }, 'PARTICIPACIÓN'),
                                                        m('option', { value: 'JUVENTUD', selected: FilteredDataComponent.categoriaFilter === 'JUVENTUD' }, 'JUVENTUD'),
                                                        m('option', { value: 'DESARROLLO PERSONAL', selected: FilteredDataComponent.categoriaFilter === 'DESARROLLO PERSONAL' }, 'DESARROLLO PERSONAL'),
                                                        m('option', { value: 'INFORMACION LABORAL', selected: FilteredDataComponent.categoriaFilter === 'INFORMACION LABORAL' }, 'INFORMACIÓN LABORAL'),

                                                    ]
                                                    ),

                                                ]
                                            ),

                                        ]
                                    ),
                                ]
                            )
                        ]
                    )
                ),
                    
                !filteredData.length > 0 ? m(Spinner) : 
            
                filteredData.length > 0 ?
                        m('div', m("div.grid.sm:grid-cols-3.lg:grid-cols-3.gap-3.mt-10",
                            filteredData.map(item =>

                                m("div.group.flex.flex-col.bg-white.shadow-lg.rounded-xl.mb-5",
                                    [
                                        m("div.flex.flex-col.justify-center.items-center.rounded-t-xl",
                                            m("img.w-full.min-h-full.h-.rounded-t-xl.h-56.object-cover", {
                                                src: `https://cdn.digitalvalue.es/quartdepoblet/assets/${item.headerImage.file}`,

                                            })
                                        ),
                                        m("div.p-4.md:p-6",
                                            [
                                                m("span.block.mb-1.text-xs.font-semibold.uppercase.text-indigo-600.dark:text-indigo-500",
                                                    item.categories.join(', ')
                                                ),
                                                m("h3.text-xl.font-semibold.text-gray-800.dark:text-gray-300.dark:hover:text-white",
                                                    item.title.und
                                                ),
                                                m("p.mt-3.text-gray-500.text-xs",
                                                    item.tipo.join(', ')

                                                )
                                            ]
                                        ),
                                        m("div.mt-auto.flex.border-t.border-gray-200.divide-x.divide-gray-200",
                                            [
                                                m("a.w-full.bg-indigo-900.text-white.py-3.px-4.inline-flex.justify-center.items-center.gap-2.rounded-b-xl.font-medium.text-gray-700.shadow-sm.align-middle.hover:bg-indigo-500.focus:outline-none.focus:ring-2.focus:ring-offset-2.focus:ring-offset-white.focus:ring-blue-600.transition-all.text-sm.sm:p-4.dark:bg-slate-900", {
                                                    href: "/quartdepoblet/pagina-item/actividad-escolar/" + item._id,

                                                },
                                                    " Ver actividad "
                                                ),
                                            ]
                                        )
                                    ]
                                )
                            )),


                        ) : m(NoHayResultados),

                )
            
        }
    };

}
