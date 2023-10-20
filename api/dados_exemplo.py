import datetime

from sqlalchemy.ext.asyncio import AsyncSession

from models.consulta import Consulta, Status, Pauta, Comentario
from models.usuario import Usuario
from routes.auth import get_password_hash


async def popular_banco(session: AsyncSession):
    usuario1 = Usuario(
        id="usuario1",
        nickname="joao",
        nome="João",
        sobrenome="Silva",
        cpf="123.456.789-01",
        data_nascimento=datetime.date(1990, 5, 15),
        genero="Masculino",
        cep="12345-678",
        cidade="São Paulo",
        uf="SP",
        senha_hash=get_password_hash("joao123")
    )

    usuario2 = Usuario(
        id="usuario2",
        nickname="maria",
        nome="Maria",
        sobrenome="Santos",
        cpf="987.654.321-02",
        data_nascimento=datetime.date(1985, 8, 25),
        genero="Feminino",
        cep="54321-987",
        cidade="Rio de Janeiro",
        uf="RJ",
        senha_hash=get_password_hash("maria123")
    )

    session.add_all([usuario1, usuario2])
    await session.commit()

    consulta1 = Consulta(
        id="consulta1",
        titulo="Plano de Ação para Prevenção e Controle do Desmatamento e das Queimadas no Bioma Cerrado",
        descricao="O objetivo desta consulta pública é receber contribuições para o Plano de Ação para Prevenção e "
                  "Controle do Desmatamento e das Queimadas no Bioma Cerrado",
        detalhes="O Plano de Ação para Prevenção e Controle do Desmatamento e das Queimadas no Bioma Cerrado visa "
                 "reduzir de forma contínua o desmatamento e criar as condições para a transição"
                 "para um modelo de desenvolvimento sustentável no Cerrado. Um dos principais desafios é integrar o "
                 "combate ao desmatamento nas políticas de Estado brasileiras, partindo-se do princípio de que o "
                 "combate às causas do desmatamento não pode ser conduzido de forma isolada pelos órgãos ambientais. "
                 "Pelo contrário, a complexidade e a transversalidade do desafio exigem esforços coordenados de "
                 "diversos setores.",
        orgao="Secretaria do Meio Ambiente",
        data_inicial=datetime.datetime(2023, 9, 12, 0, 0, 0, 0),
        data_termino=datetime.datetime(2023, 11, 12, 23, 59, 59, 0),
        status=Status.emAberto,
        pautas=[
            Pauta(
                id="c1pauta1",
                texto="Deveria haver restrições mais rigorosas ao desenvolvimento em áreas protegidas?",
                votos_sim=130,
                votos_nao=237,
                comentarios=[]
            ),
            Pauta(
                id="c1pauta2",
                texto="Devemos adotar medidas adicionais para proteger espécies ameaçadas de extinção em nossa região?",
                votos_sim=510,
                votos_nao=340,
                comentarios=[]
            ),
            Pauta(
                id="c1pauta3",
                texto="Como podemos melhorar nossas políticas de reciclagem e gerenciamento de resíduos?",
                votos_sim=None,
                votos_nao=None,
                comentarios=[]
            ),
            Pauta(
                id="c1pauta4",
                texto="Deveríamos investir mais em fontes de energia renovável?",
                votos_sim=200,
                votos_nao=100,
                comentarios=[]
            ),
            Pauta(
                id="c1pauta5",
                texto="Deveria haver restrições adicionais sobre o uso de produtos químicos nocivos em atividades industriais?",
                votos_sim=300,
                votos_nao=500,
                comentarios=[]
            ),
        ]
    )
    consulta2 = Consulta(
        id="consulta2",
        titulo="Plano de Gestão Sustentável dos Recursos Hídricos em Bacias Hidrográficas",
        descricao="Esta consulta pública tem como objetivo coletar insights e sugestões para o desenvolvimento do Plano de Gestão Sustentável dos Recursos Hídricos em Bacias Hidrográficas.",
        detalhes="O Plano de Gestão Sustentável dos Recursos Hídricos em Bacias Hidrográficas busca garantir a utilização responsável e a preservação dos recursos hídricos em nossa região. A gestão adequada da água é fundamental para o bem-estar da comunidade e a manutenção do equilíbrio ecológico. Estamos comprometidos em envolver os cidadãos e partes interessadas neste processo de tomada de decisão.",
        orgao="Secretaria de Recursos Hídricos",
        data_inicial=datetime.datetime(2023, 10, 15, 0, 0, 0, 0),
        data_termino=datetime.datetime(2023, 12, 15, 23, 59, 59, 0),
        status=Status.emAberto,
        pautas=[
            Pauta(
                id="c2pauta1",
                texto="Deveriam ser implementadas medidas de conservação das nascentes em nossas bacias hidrográficas?",
                votos_sim=250,
                votos_nao=98,
                comentarios=[]
            ),
            Pauta(
                id="c2pauta2",
                texto="Quais ações podem ser tomadas para reduzir a poluição da água em nossos rios e lagos?",
                votos_sim=None,
                votos_nao=None,
                comentarios=[
                    Comentario(
                        id="c221",
                        comentario="Deve ser feita fiscalização nas areas de despejo de esgoto",
                        usuario=usuario1
                    )
                ]
            ),
            Pauta(
                id="c2pauta3",
                texto="Como podemos promover o uso responsável da água em atividades agrícolas e industriais?",
                votos_sim=None,
                votos_nao=None,
                comentarios=[
                    Comentario(
                        id="c231",
                        comentario="Tem que ser oferecido treinamento e educação aos agricultores e industriais sobre "
                                   "práticas sustentáveis de gestão de água",
                        usuario=usuario2
                    ),
                    Comentario(
                        id="c232",
                        comentario="é nescessario implementar tecnologias de irrigação mais eficientes, "
                                   "como gotejamento e aspersão, na agricultura",
                        usuario=usuario1
                    )
                ]
            ),
            Pauta(
                id="c2pauta4",
                texto="Deveríamos investir em tecnologias para monitorar a qualidade da água em tempo real?",
                votos_sim=30,
                votos_nao=20,
                comentarios=[]
            ),
            Pauta(
                id="c2pauta5",
                texto="Quais políticas de educação ambiental podem ser implementadas para conscientizar a população sobre a importância da conservação dos recursos hídricos?",
                votos_sim=None,
                votos_nao=None,
                comentarios=[]
            ),
        ]
    )
    session.add_all([consulta1, consulta2])
    await session.commit()
