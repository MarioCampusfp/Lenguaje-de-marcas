<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
  <xsl:template match="/">
  	<html>
		<body>
		<h1>Lista de coches</h1>
		<table border="1">
			<tr>
				<th>generacion</th>
				<th>nombre</th>
				<th>tipo</th>
        <th>primera_aparicion</th>
        <th>debilidades</th>
			</tr>
			<xsl:for-each select="pokemon_legentarios/pokemon">
				<tr>
					<td><xsl:value-of select="generacion"/></td>
					<td><xsl:value-of select="nombre"/></td>
					<td><xsl:value-of select="tipo"/></td>
          <td><xsl:value-of select="primera_aparicion"/></td>
          <td><xsl:value-of select="debilidades"/></td>
				</tr>
			</xsl:for-each>
		</table>

		
		</body>
		</html>
	</xsl:template>
</xsl:stylesheet>
