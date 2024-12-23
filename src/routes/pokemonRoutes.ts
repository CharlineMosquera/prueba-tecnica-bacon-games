import { Router } from "express";
import { addPokemon, getInventory } from "../controllers/pokemonController";

const router = Router();

/**
 * @swagger
 * /api/pokemon/add:
 *   post:
 *     summary: Añadir un nuevo Pokémon al inventario del usuario autenticado
 *     tags: [Pokémon]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pokemonName:
 *                 type: string
 *                 example: pikachu
 *     responses:
 *       200:
 *         description: Pokémon agregado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Pokémon agregado exitosamente
 *                 pokemon:
 *                   type: string
 *                   example: pikachu
 *       401:
 *         description: Usuario no autenticado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuario no autenticado
 *       404:
 *         description: Pokémon no encontrado o Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Pokémon no encontrado
 *       500:
 *         description: Error en el servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error en el servidor
 */
router.post("/add", addPokemon);

/**
 * @swagger
 * /api/pokemon/inventory:
 *   get:
 *     summary: Obtener el inventario de Pokémon del usuario autenticado
 *     tags: [Pokémon]
 *     responses:
 *       200:
 *         description: Inventario de Pokémon del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 pokemons:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         example: pikachu
 *                       data:
 *                         type: object
 *                         description: Datos completos del Pokémon desde la PokeAPI
 *       401:
 *         description: Usuario no autenticado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuario no autenticado
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuario no encontrado
 *       500:
 *         description: Error en el servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error en el servidor
 */
router.get("/inventory", getInventory);

export default router;