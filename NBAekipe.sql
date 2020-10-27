--
-- PostgreSQL database dump
--

-- Dumped from database version 12.2
-- Dumped by pg_dump version 12.2

-- Started on 2020-10-27 11:19:55

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 202 (class 1259 OID 16724)
-- Name: popisekipa; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.popisekipa (
    "Ime ekipe" character varying(50) NOT NULL,
    "Grad" character varying(50),
    "Savezna drzava" character varying(50),
    "Arena" character varying(50),
    "Kapacitet" integer,
    "Godina osnutka" integer,
    "Godina prikljucenja" integer,
    "Wikipedia stranica" character varying(200),
    "Trener" character varying(50),
    "Vlasnistvo" json,
    "Igraci" json
);


ALTER TABLE public.popisekipa OWNER TO postgres;

--
-- TOC entry 2813 (class 0 OID 16724)
-- Dependencies: 202
-- Data for Name: popisekipa; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.popisekipa VALUES ('Denver Nuggets', 'Denver', 'Colorado', 'Ball Arena', 19520, 1967, 1976, 'https://en.wikipedia.org/wiki/Denver_Nuggets', 'Michael Malone', '[{"Ime":"Ann","Prezime":"Walton Kroenke"}]', '[{"Ime":"Nikola","Prezime":"Jokić"},{"Ime":"Paul","Prezime":"Millsap"},{"Ime":"Jamal","Prezime":"Murray"},{"Ime":"Bol","Prezime":"Bol"},{"Ime":"Mason","Prezime":"Plumlee"}]');
INSERT INTO public.popisekipa VALUES ('Golden State Warriors', 'San Francisco', 'California', 'Chase Center', 18064, 1946, 1946, 'https://en.wikipedia.org/wiki/Golden_State_Warriors', 'Steve Kerr', '[{ "Ime ": "Joe " , "Prezime ": "Lacob "} ,{ "Ime ": "Peter " , "Prezime ": "Gruber "}]', '[{ "Ime ": "Stephen " , "Prezime ": "Curry "} ,{ "Ime ": "Klay " , "Prezime ": "Thompson "} ,{ "Ime ": "Draymond " , "Prezime ": "Green "} ,{ "Ime ": "Kevon " , "Prezime ": "Looney "} ,{ "Ime ": "Andrew " , "Prezime ": "Wiggins "}]');
INSERT INTO public.popisekipa VALUES ('Los Angeles Lakers', 'Los Angeles', 'California', 'Staples Center', 18997, 1947, 1948, 'https://en.wikipedia.org/wiki/Los_Angeles_Lakers', 'Frank Vogel', '[{ "Ime ": "Philip " , "Prezime ": "Anschutz "} ,{ "Ime ": "Edward " , "Prezime ": "Roski "}]', '[{ "Ime ": "LeBron " , "Prezime ": "James "} ,{ "Ime ": "Anthony " , "Prezime ": "Davis "} ,{ "Ime ": "Kyle " , "Prezime ": "Kuzma "} ,{ "Ime ": "Rajon " , "Prezime ": "Rondo "} ,{ "Ime ": "Alex " , "Prezime ": "Caruso "}]');
INSERT INTO public.popisekipa VALUES ('Los Angeles Clippers', 'Los Angeles', 'California', 'Staples Center', 19060, 1970, 1970, 'https://en.wikipedia.org/wiki/Los_Angeles_Clippers', 'Tyronn Lue', '[{ "Ime ": "Steve " , "Prezime ": "Ballmer "}]', '[{ "Ime ": "Paul " , "Prezime ": "George "} ,{ "Ime ": "Kawhi " , "Prezime ": "Leonard "} ,{ "Ime ": "Lou " , "Prezime ": "Williams "} ,{ "Ime ": "Ivica " , "Prezime ": "Zubac "} ,{ "Ime ": "Marcus " , "Prezime ": "Morris "}]');
INSERT INTO public.popisekipa VALUES ('Portland Trail Blazers', 'Portland', 'Oregon', 'Moda Center', 19441, 1970, 1970, 'https://en.wikipedia.org/wiki/Portland_Trail_Blazers', 'Terry Stotts', '[{ "Ime ": "Paul " , "Prezime ": "Allen "}]', '[{ "Ime ": "Damian " , "Prezime ": "Lillard "} ,{ "Ime ": "Jusuf " , "Prezime ": "Nurkić "} ,{ "Ime ": "Mario " , "Prezime ": "Hezonja "} ,{ "Ime ": "Carmelo " , "Prezime ": "Anthony "} ,{ "Ime ": "CJ " , "Prezime ": "McCollum "}]');
INSERT INTO public.popisekipa VALUES ('Oklahoma City Thunder', 'Oklahoma City', 'Oklahoma', 'Chesapeake Energy Arena', 18203, 1967, 1967, 'https://en.wikipedia.org/wiki/Oklahoma_City_Thunder', 'Billy Donovan', '[{ "Ime ": "Clay " , "Prezime ": "Bennett "}]', '[{ "Ime ": "Chris " , "Prezime ": "Paul "} ,{ "Ime ": "Steven " , "Prezime ": "Adams "} ,{ "Ime ": "Dennis " , "Prezime ": "Schröder "} ,{ "Ime ": "Mike " , "Prezime ": "Muscala "} ,{ "Ime ": "Shai " , "Prezime ": "Gilgeous-Alexander "}]');
INSERT INTO public.popisekipa VALUES ('Houston Rockets', 'Houston', 'Texas', 'Toyota Center', 18055, 1967, 1967, 'https://en.wikipedia.org/wiki/Houston_Rockets', 'Mike DˇAntoni', '[{ "Ime ": "Tilman " , "Prezime ": "Fertitta "}]', '[{ "Ime ": "James " , "Prezime ": "Harden "} ,{ "Ime ": "Russell " , "Prezime ": "Westbrook "} ,{ "Ime ": "Robert " , "Prezime ": "Covington "} ,{ "Ime ": "Austin " , "Prezime ": "Rivers "} ,{ "Ime ": "Eric " , "Prezime ": "Gordon "}]');
INSERT INTO public.popisekipa VALUES ('Dallas Mavericks', 'Dallas', 'Texas', 'American Airlines Center', 19200, 1980, 1980, 'https://en.wikipedia.org/wiki/Dallas_Mavericks', 'Rick Carlisle', '[{ "Ime ": "Mark " , "Prezime ": "Cuban "}]', '[{ "Ime ": "Luka " , "Prezime ": "Dončić "} ,{ "Ime ": "Kristaps " , "Prezime ": "Porzingis "} ,{ "Ime ": "Seth " , "Prezime ": "Curry "} ,{ "Ime ": "Tim " , "Prezime ": "Hardaway "} ,{ "Ime ": "Boban " , "Prezime ": "Marjanović "}]');
INSERT INTO public.popisekipa VALUES ('Phoenix Suns', 'Phoenix', 'Arizona', 'Talking Stick Resort Arena', 18055, 1968, 1968, 'https://en.wikipedia.org/wiki/Phoenix_Suns', 'Monty Williams', '[{ "Ime ": "Robert " , "Prezime ": "Sarver "}]', '[{ "Ime ": "Devin " , "Prezime ": "Booker "} ,{ "Ime ": "Deandre " , "Prezime ": "Ayton "} ,{ "Ime ": "Ricky " , "Prezime ": "Rubio "} ,{ "Ime ": "Dario " , "Prezime ": "Šarić "} ,{ "Ime ": "Aron " , "Prezime ": "Baynes "}]');
INSERT INTO public.popisekipa VALUES ('Utah Jazz', 'Salt Lake City', 'Utah', 'Vivint Smart Home Arena', 19911, 1974, 1974, 'https://en.wikipedia.org/wiki/Utah_Jazz', 'Quin Snyder', '[{ "Ime ": "Gail " , "Prezime ": "Miller "}]', '[{ "Ime ": "Donovan " , "Prezime ": "Mitchell "} ,{ "Ime ": "Rudy " , "Prezime ": "Gobert "} ,{ "Ime ": "Joe " , "Prezime ": "Ingles "} ,{ "Ime ": "Mike " , "Prezime ": "Conley "} ,{ "Ime ": "Bojan " , "Prezime ": "Bogdanović "}]');
INSERT INTO public.popisekipa VALUES ('New Orleans Pelicans', 'New Orleans', 'Louisiana', 'Smoothie King Center', 16867, 2002, 2002, 'https://en.wikipedia.org/wiki/New_Orleans_Pelicans', 'Stanley Van Gundy', '[{ "Ime ": "Gayle " , "Prezime ": "Benson "}]', '[{ "Ime ": "Zion " , "Prezime ": "Williamson "} ,{ "Ime ": "Brandon " , "Prezime ": "Ingram "} ,{ "Ime ": "Jrue " , "Prezime ": "Holiday "} ,{ "Ime ": "Lonzo " , "Prezime ": "Ball "} ,{ "Ime ": "Josh " , "Prezime ": "Hart "}]');
INSERT INTO public.popisekipa VALUES ('Minnesota Timberwolves', 'Minneapolis', 'Minnesota', 'Target Center', 19356, 1989, 1989, 'https://en.wikipedia.org/wiki/Minnesota_Timberwolves', 'Ryan Saunders', '[{ "Ime ": "Glen " , "Prezime ": "Taylor "}]', '[{ "Ime ": "D''Angelo " , "Prezime ": "Russell "} ,{ "Ime ": "Karl-Anthony " , "Prezime ": "Towns "} ,{ "Ime ": "Juan " , "Prezime ": "Hernangómez "} ,{ "Ime ": "Evan " , "Prezime ": "Turner "} ,{ "Ime ": "Josh " , "Prezime ": "Okogie "}]');


--
-- TOC entry 2686 (class 2606 OID 16731)
-- Name: popisekipa popisekipa_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.popisekipa
    ADD CONSTRAINT popisekipa_pkey PRIMARY KEY ("Ime ekipe");


-- Completed on 2020-10-27 11:19:55

--
-- PostgreSQL database dump complete
--

